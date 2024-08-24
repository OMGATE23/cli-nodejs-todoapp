import fs from 'fs'
import { Command } from 'commander'

const program = new Command();
const TODOS_JSON_LOC = 'todos.json'

const getTodos = () => {
  const data = fs.readFileSync(TODOS_JSON_LOC, 'utf8');

  if(data === ''){
    return []
  }
  return JSON.parse(data)
};

const writeTodos = (todos) => {
  fs.writeFileSync(TODOS_JSON_LOC, JSON.stringify(todos, null, 2), 'utf8');
};

program
  .name('todoapp-cli')
  .description('Todo List App')
  .version('0.8.0');

program
  .command('add')
  .description('Add a new todo')
  .argument('<task>', 'Task description')
  .action((task) => {
    const todos = getTodos();
    const newTodo = { id: task.toLowerCase().replace(/\s+/g, '')+Math.floor(Math.random()*10000), task, done: false };
    todos.push(newTodo);
    writeTodos(todos);
    console.log(`Added todo: "${task}"`);
  });

program
  .command('delete')
  .description('Delete a todo by ID')
  .argument('<id>', 'ID of the todo to delete')
  .action((id) => {
    let todos = getTodos();
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);
    if (todos.length === initialLength) {
      console.log(`Todo with ID ${id} not found.`);
    } else {
      writeTodos(todos);
      console.log(`Deleted todo with ID ${id}`);
    }
  });


program
  .command('done')
  .description('Mark a todo as done by ID')
  .argument('<id>', 'ID of the todo to mark as done')
  .action((id) => {
    const todos = getTodos();
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      todo.done = true;
      writeTodos(todos);
      console.log(`Marked todo with ID ${id} as done`);
    } else {
      console.log(`Todo with ID ${id} not found.`);
    }
  });

program
  .command('list')
  .description('List all todos')
  .action(() => {
    const todos = getTodos();
    if (todos.length === 0) {
      console.log('<---- NO TODOS CREATED ...YET ---->');
    } else {
      console.log('<---- YOUR TASKS ---->')
      console.log("Done tasks are marked with X \n \n")
      todos.forEach(todo => {
        console.log(`[${todo.done ? 'X' : ' '}] ${todo.id}: ${todo.task}`);
      });
    }
  });

program.parse();