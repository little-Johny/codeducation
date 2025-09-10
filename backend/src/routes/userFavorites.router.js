const express = require("express");
const validateHandler = require("./../middlewares/validationHandler");
const { userFavoritesSchema } = require("./../schemas/userFavorites.schema");

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

// Obtener favoritos de un usuario
router.get(
  "/user/:userId",
  validateHandler(userFavoritesSchema.getUserFavorites, "params"),
  userFavoritesController.getByUserId
);

// Agregar curso a favoritos
router.post(
  "/",
  validateHandler(userFavoritesSchema.addFavorite, "body"),
  userFavoritesController.addFavorite
);

// Toggle favorito (agregar/quitar)
router.post(
  "/toggle",
  validateHandler(userFavoritesSchema.toggleFavorite, "body"),
  userFavoritesController.toggleFavorite
);

// Verificar si un curso es favorito
router.get(
  "/check/:userId/:courseId",
  validateHandler(userFavoritesSchema.checkFavorite, "params"),
  userFavoritesController.checkFavorite
);

// Obtener conteo de favoritos de un usuario
router.get(
  "/count/:userId",
  validateHandler(userFavoritesSchema.getFavoritesCount, "params"),
  userFavoritesController.getFavoritesCount
);

// Eliminar favorito específico
router.delete(
  "/:userId/:courseId",
  validateHandler(userFavoritesSchema.deleteFavorite, "params"),
  userFavoritesController.deleteFavorite
);

// Eliminar todos los favoritos de un usuario
router.delete(
  "/all/:userId",
  validateHandler(userFavoritesSchema.deleteAllFavorites, "params"),
  userFavoritesController.deleteAllFavorites
);

module.exports = router;
