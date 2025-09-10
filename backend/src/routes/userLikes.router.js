const express = require("express");
const validateHandler = require("./../middlewares/validationHandler");
const { userLikesSchema } = require("./../schemas/userLikes.schema");

const { UserLikes } = require("./../db/models");
const UserLikesRepository = require("./../repositories/userLikes.repository");
const UserLikesService = require("./../services/userLikes.service");
const UserLikesController = require("./../controllers/userLikes.controller");

const userLikesRepository = new UserLikesRepository(UserLikes);
const userLikesService = new UserLikesService(userLikesRepository);
const userLikesController = new UserLikesController(userLikesService);

const router = express.Router();

// Dar like a una lección
router.post(
  "/like",
  validateHandler(userLikesSchema.likeLesson, "body"),
  userLikesController.likeLesson
);

// Quitar like de una lección
router.post(
  "/unlike",
  validateHandler(userLikesSchema.unlikeLesson, "body"),
  userLikesController.unlikeLesson
);

// Toggle like (dar/quitar like)
router.post(
  "/toggle",
  validateHandler(userLikesSchema.toggleLike, "body"),
  userLikesController.toggleLike
);

// Obtener likes de un usuario
router.get(
  "/user/:userId",
  validateHandler(userLikesSchema.getUserLikes, "params"),
  userLikesController.getUserLikes
);

// Obtener likes de una lección
router.get(
  "/lesson/:lessonId",
  validateHandler(userLikesSchema.getLessonLikes, "params"),
  userLikesController.getLessonLikes
);

// Verificar si un usuario le dio like a una lección
router.get(
  "/check/:userId/:lessonId",
  validateHandler(userLikesSchema.checkUserLike, "params"),
  userLikesController.checkUserLike
);

// Obtener conteo de likes de una lección
router.get(
  "/count/:lessonId",
  validateHandler(userLikesSchema.getLikesCount, "params"),
  userLikesController.getLikesCount
);

module.exports = router;