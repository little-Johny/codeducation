const express = require("express");
const validateHandler = require("./../middlewares/validationHandler");
const { userSchema } = require("./../schemas/user.schema");

const { User } = require("./../db/models");
const UserRepository = require("./../repositories/user.repository");
const UserService = require("./../services/user.service");
const UserController = require("./../controllers/user.controller");

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = express.Router();

router.get("/", userController.getUsers);
router.get(
  "/:id",
  validateHandler(userSchema.getUser, "params"),
  userController.getUserById
);
router.patch(
  "/:id",
  validateHandler(userSchema.getUser, "params"),
  validateHandler(userSchema.update, "body"),
  userController.updateUser
);
router.delete(
  "/:id",
  validateHandler(userSchema.getUser, "params"),
  userController.deleteUser
);

module.exports = router;
