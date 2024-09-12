const tasks = [];
let nextId = 1;

// Function to create a new task
exports.createTask = (title, description, dueDate) => {
  const newTask = {
    id: nextId++,
    title,
    description,
    status: "Pending", // Default status
    dueDate,
  };

  tasks.push(newTask);
  return newTask;
};

// Function to get all tasks
exports.getTasks = () => {
    if (tasks.length === 0) {
      return null;
    }
    return tasks;
  };


// Function to update a task by ID
exports.updateTask = (id, title, description, status, dueDate) => {
  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return null; // Return null if task not found
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (dueDate !== undefined) task.dueDate = dueDate;

  // Return the updated task object
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
  };
};

// Function to delete a task by ID
exports.deleteTask = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  
    if (taskIndex === -1) {
      return false; // Return false if task not found
    }
  
    tasks.splice(taskIndex, 1);
    console.log(tasks)
    return true; // Return true if task is deleted
  };
