
const Todo = require('../models/todo');
const User = require('../models/users');
const ExpireTask = require('../models/expireTask');
const async = require('async')
const moment = require('moment');
const mail = require('../util/mailSender');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.createTodo = function (req, res) {
    console.log(req.body)
    req.body.createdAt = new Date();
    Todo.find().or(
        [{
            name: new RegExp('^' + req.body.name + '$', "i")
        }]).then((todo) => {
            if (todo.length > 0) {
                res.send({
                    success: false,
                    message: "Todo are already exists"
                })
            } else {
                Todo.create(req.body, (err, newTodo) => {
                    console.log(err)
                    if (!err) {
                        res.send({
                            success: true,
                            message: "Todo created Successfully"
                        })
                    } else {
                        res.send({
                            success: false,
                            message: "Something went wrong. Please try after sometime"
                        })
                    }
                });
            }
        })
}

exports.getAllTodo = function (req, res) {
    Todo.find({}, function (err, allTodos) {
        if (!err) {
            res.send({
                success: true,
                data: allTodos
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}

exports.getTodoCondition = function (req, res) {
    console.log(req.body)
    Todo.find(req.body.filter).limit(req.body.limit)
        .skip(req.body.limit * req.body.offset).exec((err, allTodos) => {
            console.log(allTodos)
            if (!err) {
                Todo.count({}, (err, count) => {
                    res.send({
                        success: true,
                        data: allTodos,
                        count: count
                    });
                });
            } else {
                res.send({
                    success: false,
                    message: "Something went wrong. Please try after sometime"
                })
            }
        })
}

exports.getTodoById = function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!err) {
            res.send({
                success: true,
                data: todo
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}

exports.updateTodoDetails = function (req, res) {
    Todo.updateOne({
        _id: req.body.id
    }, req.body, function (err, todo) {
        if (!err) {
            res.send({
                success: true,
                data: todo
            })
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}

exports.deleteTodo = function (req, res) {
    Todo.updateOne({
        _id: req.body.id
    }, {
        isActive: false
    }, function (err, todo) {
        if (!err) {
            res.send({
                success: true,
                data: todo
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}


exports.dailySchedule = function (req, res) {
    Todo.find({ expiryDate: { $eq: moment().format('YYYY-MM-DD') } }, (err, getTask) => {
        async.forEach(getTask, (task, callback) => {
            if (task.schedule) {
                let senderMail = '';
                async.forEach(task.users, (user, callback1) => {
                    User.find({
                        _id: Schema.Types.ObjectId(user)
                    }, function (err, userMail) {
                        if (senderMail) {
                            senderMail = ';' + userMail.loginId
                        } else {
                            senderMail = userMail.loginId
                        }
                        callback1();
                    })
                }, (err, done) => {
                    let data = {
                        taskName: task.name,
                        date: task.date,
                        toMailAddress: senderMail
                    }
                    mail.sendMail(data, function (err, done) {
                        callback()
                    });
                });
            } else {
                callback();
            }

        }, function (err, comp) {
            console.log(`done`)
        });
    });


    Todo.find({ expiryDate: { $lt: moment().format('YYYY-MM-DD') } }, (err, getTask) => {
        async.forEach(getTask, (task, callback) => {
            ExpireTask.create(task, (err, expired) => {
                callback();
            });
        }, (err, comp) => {
            console.log('updated')
        })
    });
}
