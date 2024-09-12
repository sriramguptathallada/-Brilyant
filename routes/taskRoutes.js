const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {createTask, updateTask,id} = require("../validations/taskValidations")
const {validateDataAndRespond,validatePathParams} = require("../middlewares/validate")

router.get('/',taskController.getTasks);
router.post('/',validateDataAndRespond(createTask),taskController.createTask);
router.put("/:id",validatePathParams(id),validateDataAndRespond(updateTask),taskController.updateTask);
router.delete('/:id',validatePathParams(id),taskController.deleteTask);

module.exports = router;