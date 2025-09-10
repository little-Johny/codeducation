const Joi = require("joi");

const userLikesSchema = {
  likeLesson: Joi.object({
    userId: Joi.string().uuid().required(),
    lessonId: Joi.string().uuid().required(),
  }),
  unlikeLesson: Joi.object({
    userId: Joi.string().uuid().required(),
    lessonId: Joi.string().uuid().required(),
  }),
  toggleLike: Joi.object({
    userId: Joi.string().uuid().required(),
    lessonId: Joi.string().uuid().required(),
  }),
  getUserLikes: Joi.object({
    userId: Joi.string().uuid().required(),
  }),
  getLessonLikes: Joi.object({
    lessonId: Joi.string().uuid().required(),
  }),
  checkUserLike: Joi.object({
    userId: Joi.string().uuid().required(),
    lessonId: Joi.string().uuid().required(),
  }),
  getLikesCount: Joi.object({
    lessonId: Joi.string().uuid().required(),
  }),
};

module.exports = { userLikesSchema };