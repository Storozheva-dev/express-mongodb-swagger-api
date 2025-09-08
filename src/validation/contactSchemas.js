import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name must be at most {#limit} characters long',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number must be a string',
    'string.empty': 'Phone number is required',
    'string.min': 'Phone number must be at least {#limit} characters long',
    'string.max': 'Phone number must be at most {#limit} characters long',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().max(254).messages({
    'string.email': 'Email must be a valid email address',
    'string.max': 'Email must not exceed {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavorite must be true or false',
  }),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type must be a string',
      'any.only': 'Contact type must be one of: work, home, personal',
      'any.required': 'Contact type is required',
    }),
  photo: Joi.string().uri().allow(null).messages({
    'string.uri': 'Photo must be a valid URL',
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name must be at most {#limit} characters long',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number must be a string',
    'string.min': 'Phone number must be at least {#limit} characters long',
    'string.max': 'Phone number must be at most {#limit} characters long',
  }),
  email: Joi.string().email().max(254).messages({
    'string.email': 'Email must be a valid email address',
    'string.max': 'Email must not exceed {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavorite must be true or false',
  }),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'home', 'personal')
    .messages({
      'string.base': 'Contact type must be a string',
      'any.only': 'Contact type must be one of: work, home, personal',
    }),
  photo: Joi.string().uri().allow(null, '').optional(),
});
