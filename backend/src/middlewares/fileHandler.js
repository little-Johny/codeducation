const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { config } = require("../config/config");

const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const storage = (dir) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

// Crear Directorio si no existe

const allowedTypes = process.env.ALLOWED_FILE_TYPES
  ? process.env.ALLOWED_FILE_TYPES.split(',')
  : [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

const FILE_SIZE_LIMIT = parseInt(process.env.FILE_SIZE_LIMIT) || (5 * 1024 * 1024); // Default 5MB

const fileFilter = (req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype))
    return cb(new Error("Invalid file type"), false);
  cb(null, true);
};

const upload = (dir) => {
  createDir(dir);
  return multer({
    storage: storage(dir),
    limits: {
      fileSize: FILE_SIZE_LIMIT,
    },
    fileFilter: fileFilter,
  });
};

function getUploadedFileURL(folder, filename) {
  // Asegurar que no haya espacios en blanco
  const cleanFolder = folder.trim();
  const cleanFilename = filename.trim();

  // Usar variable de entorno o fallback
  const baseUrl = process.env.UPLOAD_BASE_URL || 'http://localhost:3000/files';

  // Construir URL completa y limpia
  const url = `${baseUrl}/${cleanFolder}/${cleanFilename}`;
  return url;
}

module.exports = {
  upload,
  getUploadedFileURL,
};
