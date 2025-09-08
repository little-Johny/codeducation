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

const allowedTypes = [
  "image/jpeg",
  "image/png",
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

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

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
  return `  http://localhost:3000/files/${folder}/${filename}`;
}

module.exports = {
  upload,
  getUploadedFileURL,
};
