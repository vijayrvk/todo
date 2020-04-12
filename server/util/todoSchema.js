const Joi = require('joi');

const createTodoSchema = Joi.object({
    name: Joi.string().required(),
    expiryDate: Joi.string().required(),
    status: Joi.string().required(),
    createdAt: Joi.date().timestamp(),
    updateAt: Joi.date().timestamp(),
    users: Joi.array().allow(null, [])
});
const updateTodoSchema = Joi.object({
    name: Joi.string().required(),
    expiryDate: Joi.string().required(),
    status: Joi.string().required(),
    createdAt: Joi.date().timestamp(),
    updateAt: Joi.date().timestamp(),
    id: Joi.string(),
    users: Joi.array().allow(null, [])
});
const getTodoSchema = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createTodoSchema: createTodoSchema,
    updateTodoSchema: updateTodoSchema,
    getTodoSchema: getTodoSchema
};