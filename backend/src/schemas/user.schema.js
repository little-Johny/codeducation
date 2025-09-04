const Joi = require("joi");

const userSchema = {
  create: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
      .required(),
    role: Joi.string().valid("student", "teacher", "admin").default("student"),
    theme: Joi.boolean().default(false),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).options({ stripUnknown: true }), // Eliminacion de campos extra
  update: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    role: Joi.string().valid("student", "teacher", "admin"),
    theme: Joi.boolean(),
  }),
  getUser: Joi.object({
    id: Joi.string().uuid().required(),
  }),
};

module.exports = { userSchema };
