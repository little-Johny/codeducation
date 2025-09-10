const Joi = require("joi");

const lessonSchema = {
  create: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).optional(),
    courseId: Joi.string().uuid().required()
  }),
  update: Joi.object({
    name: Joi.string().min(3).max(100),
    description: Joi.string().min(10),
    courseId: Joi.string().uuid()
  }).options({ stripUnknown: true }),
  getLesson: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  getLessonsByCourse: Joi.object({
    courseId: Joi.string().uuid().required(),
  }),
};

module.exports = { lessonSchema };