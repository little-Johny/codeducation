const express = require("express");
const path = require("path");
const validateHandler = require("./../middlewares/validationHandler");
const { upload } = require("../middlewares/fileHandler");
const { lessonSchema } = require("./../schemas/lesson.schema");

const { Lessons } = require("./../db/models");
const LessonRepository = require("./../repositories/lesson.repository");
const LessonService = require("./../services/lesson.service");
const LessonController = require("./../controllers/lesson.controller");

const lessonRepository = new LessonRepository(Lessons);
const lessonService = new LessonService(lessonRepository);
const lessonController = new LessonController(lessonService);

const router = express.Router();

router.get("/", lessonController.getLessons);
router.get(
  "/course/:courseId",
  validateHandler(lessonSchema.getLessonsByCourse, "params"),
  lessonController.getLessonsByCourse
);
router.get(
  "/:id",
  validateHandler(lessonSchema.getLesson, "params"),
  lessonController.getLessonById
);
router.post(
  "/",
  validateHandler(lessonSchema.create, "body"),
  upload(path.join(__dirname, "../../uploads/lessons")).single("video"),
  lessonController.createLesson
);
router.post(
  "/:id/video",
  upload(path.join(__dirname, "../../uploads/lessons")).single("video"),
  validateHandler(lessonSchema.getLesson, "params"),
  lessonController.addLessonVideo
);
router.patch(
  "/:id",
  validateHandler(lessonSchema.getLesson, "params"),
  validateHandler(lessonSchema.update, "body"),
  lessonController.updateLesson
);
router.delete(
  "/:id",
  validateHandler(lessonSchema.getLesson, "params"),
  lessonController.deleteLesson
);

module.exports = router;