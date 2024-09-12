const taskService = require('../services/taskService');
const httpStatus = require('http-status');
const {responseHandler} = require("../utils/resposneHandler")
 // req, res, statusCode, message, result

// Controller function to create a new task
exports.createTask = (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const newTask = taskService.createTask(title, description, dueDate);
    return responseHandler(req,res,httpStatus.CREATED,"Task created successfully",newTask)
  } catch (error) {
    return responseHandler(req,res,httpStatus.INTERNAL_SERVER_ERROR,"Failed to create task",[])
  }
};

// Controller function to get all tasks
exports.getTasks = (req, res) => {
  try {
    const tasks = taskService.getTasks();
    if (!tasks) {
      return responseHandler(req,res,httpStatus.OK,"Task List Is Empty",[])
      }
      return responseHandler(req,res,httpStatus.OK,"Task List fetched successfully",tasks)
  } catch (error) {
    return responseHandler(req,res,httpStatus.INTERNAL_SERVER_ERROR,"Failed to retrieve tasks",[])
  }
};

// Controller function to update a task by ID
exports.updateTask = (req, res) => {
  try {
    const { id } = req.params;
    
    const { title, description, status, dueDate } = req.body;
    const updatedTask = taskService.updateTask(id, title, description, status, dueDate);
    if (!updatedTask) {
      return responseHandler(req,res,httpStatus.NOT_FOUND,"Task not found",[])
    }
    return responseHandler(req,res,httpStatus.OK,"Task updated successfully",updatedTask)
  } catch (error) {
    return responseHandler(req,res,httpStatus.INTERNAL_SERVER_ERROR,"Failed to update task",[])
  }
};

// Controller function to delete a task by ID
exports.deleteTask = (req, res) => {
  try {
    const { id } = req.params;

    const isDeleted = taskService.deleteTask(id);

    if (!isDeleted) {
      return responseHandler(req,res,httpStatus.NOT_FOUND,"Task not found",[])
    }
    return responseHandler(req,res,httpStatus.OK,"Task deleted successfully",[])
  } catch (error) {
    return responseHandler(req,res,httpStatus.INTERNAL_SERVER_ERROR,"Failed to delete task",[])
  }
};

