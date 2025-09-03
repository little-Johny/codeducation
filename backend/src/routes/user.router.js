const  express = require('express');

const {User} = require('./../db/models');
const UserRepository = require('./../repositories/user.repository');
const UserService = require('./../services/user.service');
const UserController = require('./../controllers/user.controller');

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);


module.exports = router;  