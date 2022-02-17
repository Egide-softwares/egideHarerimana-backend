import Joi from "joi";

export const newUserSchema = Joi.object({
	firstName: Joi.string().min(3).max(40).required(),
	lastName: Joi.string().min(3).max(40).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(3).max(40).required(),
	nid: Joi.string().min(16).max(16).required(),
});

export const userLoginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(3).max(40).required()
});