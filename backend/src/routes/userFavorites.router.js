const express = require("express");

const { User } = require("./../db/models");
const { Course } = require("./../db/models");
const { UserFavorites } = require("./../db/models");

const UserRepository = require("./../repositories/user.repository");
const CourseRepository = require("./../repositories/course.repository");
const UserFavoritesRepository = require("../repositories/userFavorites.respository");

const UserService = require("./../services/user.service");
const CourseService = require("./../services/course.service");
const UserFavoritesService = require("./../services/userFavorites.service");

const UserFavoritesController = require("./../controllers/userFavorites.controller");

const userRepository = new UserRepository(User); 
const courseRepository = new CourseRepository(Course);
const userFavoritesRepository = new UserFavoritesRepository(UserFavorites);

const userFavoritesService = new UserFavoritesService(
  userFavoritesRepository,
  userRepository, 
  courseRepository
);

const userFavoritesController = new UserFavoritesController(
  userFavoritesService
);

const router = express.Router();

router.get("/:userId", userFavoritesController.getByUserId);
router.post("/", userFavoritesController.addFavorite);
router.delete("/:userId", userFavoritesController.deleteFavorite);
router.delete("/all", userFavoritesController.deleteAllFavorites);

module.exports = router;
