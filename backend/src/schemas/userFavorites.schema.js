const Joi = require("joi");

const userFavoritesSchema = {
  addFavorite: Joi.object({
    userId: Joi.string().uuid().required(),
    courseId: Joi.string().uuid().required(),
  }),
  toggleFavorite: Joi.object({
    userId: Joi.string().uuid().required(),
    courseId: Joi.string().uuid().required(),
  }),
  getUserFavorites: Joi.object({
    userId: Joi.string().uuid().required(),
  }),
  checkFavorite: Joi.object({
    userId: Joi.string().uuid().required(),
    courseId: Joi.string().uuid().required(),
  }),
  deleteFavorite: Joi.object({
    userId: Joi.string().uuid().required(),
    courseId: Joi.string().uuid().required(),
  }),
  deleteAllFavorites: Joi.object({
    userId: Joi.string().uuid().required(),
  }),
  getFavoritesCount: Joi.object({
    userId: Joi.string().uuid().required(),
  }),
};

module.exports = { userFavoritesSchema };