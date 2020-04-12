var express = require('express');
var router = express.Router();
var schedule = require('node-schedule');
const todoSchema = require('../util/todoSchema');
const validator = require('express-joi-validation').createValidator({
    passError: true
})

// Require the controllers WHICH WE DID NOT CREATE YET!!
var todoController = require('../controllers/todoController');
var authController = require('../controllers/authController');

router.use(authController.validUserToken)

router.post('/createTodo', validator.body(todoSchema.createTodoSchema), todoController.createTodo);

router.get('/getAllTodo', todoController.getAllTodo);

router.post('/getTodoCondition', todoController.getTodoCondition);

router.get('/getTodoDetails/:id', validator.params(todoSchema.getTodoSchema), todoController.getTodoById);

router.post('/updateTodoDetails', validator.body(todoSchema.updateTodoSchema), todoController.updateTodoDetails);

router.post('/deleteTodo', todoController.deleteTodo);

schedule.scheduleJob('47 10 * * *', function () {
    todoController.dailySchedule();
});


module.exports = router;