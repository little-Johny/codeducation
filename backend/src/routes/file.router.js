const express = require("express");
const path = require("path");
const validateHandler = require("./../middlewares/validationHandler");
const { upload } = require("../middlewares/fileHandler");
const { fileSchema } = require("./../schemas/file.schema");

const { Files } = require("./../db/models");
const FileRepository = require("./../repositories/file.repository");
const FileService = require("./../services/file.service");
const FileController = require("./../controllers/file.controller");

const fileRepository = new FileRepository(Files);
const fileService = new FileService(fileRepository);
const fileController = new FileController(fileService);

const router = express.Router();

// Subir archivo a una lección
router.post(
  "/lesson/:lessonId",
  validateHandler(fileSchema.getFilesByLesson, "params"),
  upload(path.join(__dirname, "../../uploads/files")).single("file"),
  fileController.uploadFile
);

// Obtener archivos de una lección
router.get(
  "/lesson/:lessonId",
  validateHandler(fileSchema.getFilesByLesson, "params"),
  fileController.getFilesByLesson
);

// Obtener archivo por ID
router.get(
  "/:id",
  validateHandler(fileSchema.getFile, "params"),
  fileController.getFileById
);

// Descargar archivo
router.get(
  "/:id/download",
  validateHandler(fileSchema.downloadFile, "params"),
  fileController.downloadFile
);

// Actualizar archivo
router.patch(
  "/:id",
  validateHandler(fileSchema.getFile, "params"),
  validateHandler(fileSchema.update, "body"),
  fileController.updateFile
);

// Eliminar archivo
router.delete(
  "/:id",
  validateHandler(fileSchema.getFile, "params"),
  fileController.deleteFile
);

module.exports = router;