const Joi = require("joi");

const fileSchema = {
  upload: Joi.object({
    lessonId: Joi.string().uuid().required(),
  }),
  update: Joi.object({
    filename: Joi.string().min(1).max(255),
    type: Joi.string().min(1).max(100),
  }).options({ stripUnknown: true }),
  getFile: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  getFilesByLesson: Joi.object({
    lessonId: Joi.string().uuid().required(),
  }),
  downloadFile: Joi.object({
    id: Joi.string().uuid().required(),
  }),
};

module.exports = { fileSchema };