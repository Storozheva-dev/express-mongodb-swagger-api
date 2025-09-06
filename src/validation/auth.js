import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name must be at most {#limit} characters long',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().max(254).required().messages({
    'string.email': 'Email must be a valid email address',
    'string.max': 'Email must not exceed {#limit} characters',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password must be at most {#limit} characters long',
    'any.required': 'Password is required',
  }),
});

// login
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
