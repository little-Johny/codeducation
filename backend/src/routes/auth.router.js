const express = require("express");

const User = require("./../db/models/user");
const UserRepository = require("./../repositories/user.repository");
const AuthService = require("./../services/auth.service");
const AuthController = require("./../controllers/auth.controller");

const userRepository = new UserRepository(User);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;