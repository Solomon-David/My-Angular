const express = require('express')
const Routes = new express.Router()
const { getAllTask, UpdateTask, deleteTask, addTask, getTask } = require('../controller/Taskcontroller')

Routes.route('/task').get(getAllTask).post(addTask);
Routes.route('/task/:id').get(getTask).patch(UpdateTask).delete(deleteTask)


module.exports = Routes