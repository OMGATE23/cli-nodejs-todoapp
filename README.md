# Assignment 2

## Step 1
Go to the assignment2 folder

`cd assignment2`
### Add to Todo list app

`node index.js add "Task to be done"`

This will add the task in the todo.json.
the todo task looks like 
```
{
  task: "Task to be done",
  id: "tasktobedone2423",
  done: false
}
```

### Delete a task
use the task's id to delete the task
`node index.js delete tasktobedone2423`

### Mark a task as done
use the task's id to mark as done
`node index.js done tasktobedone2423`

### List all tasks

`node index.js list`

This is the output for the command

<img width="253" alt="Screenshot 2024-08-24 at 9 02 14 PM" src="https://github.com/user-attachments/assets/4ed5edf4-4600-4306-8239-44f457a8a0e7">

