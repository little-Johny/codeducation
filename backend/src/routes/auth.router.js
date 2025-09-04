const express = require("express");
const passport = require("passport");
const validateHandler = require("./../middlewares/validationHandler");
const { userSchema } = require("./../schemas/user.schema");

const { User } = require("./../db/models");
const UserRepository = require("./../repositories/user.repository");
const AuthService = require("./../services/auth.service");
const AuthController = require("./../controllers/auth.controller");

const userRepository = new UserRepository(User);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const router = express.Router();

router.post(
  "/register",
  validateHandler(userSchema.create, "body"),
  authController.register
);
router.post(
  "/login",
  validateHandler(userSchema.login, "body"),
  authController.login
);

router.get(
  "/session",
  passport.authenticate("jwt", { session: false }),
  authController.getSession
);
module.exports = router;
