const express = require("express");
const path = require("path");
const validateHandler = require("./../middlewares/validationHandler");
const { upload } = require("../middlewares/fileHandler");
const { courseSchema } = require("./../schemas/course.schema");

const { Course } = require("./../db/models");
const CourseRepository = require("./../repositories/course.repository");
const CourseService = require("./../services/course.service");
const CourseController = require("./../controllers/course.controller");

const courseRepository = new CourseRepository(Course);
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

const router = express.Router();

router.get("/", courseController.getCourses);
router.get(
  "/search",
  validateHandler(courseSchema.getCoursesByFilters, "query"),
  courseController.getCoursesByCategory
);
router.get(
  "/:id",
  validateHandler(courseSchema.getCourse, "params"),
  courseController.getCourseById
);
router.post(
  "/",
  validateHandler(courseSchema.create, "body"),
  upload(path.join(__dirname, "../../uploads/course")).single("image"),
  courseController.createCourse
);
router.post(
  "/:id/files",
  upload(path.join(__dirname, "../../uploads/course")).single("image"),
  validateHandler(courseSchema.getCourse, "params"),
  courseController.addCourseImage
);
router.patch(
  "/:id",
  validateHandler(courseSchema.getCourse, "params"),
  validateHandler(courseSchema.update, "body"),
  courseController.updateCourse
);
router.delete(
  "/:id",
  validateHandler(courseSchema.getCourse, "params"),
  courseController.deleteCourse
);

module.exports = router;
