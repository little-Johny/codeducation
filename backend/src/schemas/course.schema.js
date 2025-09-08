const Joi = require("joi");

const courseSchema = {
  create: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    category: Joi.string().required(),
    userId: Joi.string().uuid().optional()
  }),
  update: Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10),
    category: Joi.string(),
    userId: Joi.string().uuid()
  }).options({ stripUnknown: true }),
  getCourse: Joi.object({
    id: Joi.string().uuid().optional(),
  }),
  getCoursesByFilters: Joi.object({
    title: Joi.string().min(3).max(100),
    category: Joi.string(),
  }),
};

module.exports = { courseSchema };
