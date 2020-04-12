const Joi = require('joi');



const createUserSchema = Joi.object({
    name: Joi.string().required(),
    loginId: Joi.string().email().required(),
    password: Joi.string().required(),
    isActive: Joi.boolean()
})
const updateUserSchema = Joi.object({
    name: Joi.string().required(),
    loginId: Joi.string().email().required(),
    password: Joi.string(),
    isActive: Joi.boolean(),
    updatedBy: Joi.string(),
    id: Joi.string()
})
const getUserSchema = Joi.object({
    id: Joi.string().required()
})


module.exports = {
    createUserSchema: createUserSchema,
    updateUserSchema: updateUserSchema,
    getUserSchema: getUserSchema
};