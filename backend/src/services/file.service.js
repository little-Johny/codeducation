const boom = require("@hapi/boom");
const fs = require("fs").promises;
const path = require("path");
const { getUploadedFileURL } = require("../middlewares/fileHandler");

class FileService {
  constructor(fileRepository) {
    this.fileRepository = fileRepository;
  }

  async uploadFile(lessonId, file) {
    try {
      // Validar que la lección existe
      const { Lessons } = require("../db/models");
      const lesson = await Lessons.findByPk(lessonId);
      if (!lesson) {
        throw boom.notFound("Lesson not found");
      }

      // Generar URL del archivo
      const fileUrl = getUploadedFileURL("files", file.filename);

      // Crear registro en la base de datos
      const fileData = {
        lessonId,
        filename: file.originalname,
        url: fileUrl,
        type: file.mimetype,
      };

      const newFile = await this.fileRepository.create(fileData);
      return newFile;
    } catch (error) {
      throw error;
    }
  }

  async getFilesByLesson(lessonId) {
    try {
      const files = await this.fileRepository.getByLessonId(lessonId);
      if (files.length === 0) {
        throw boom.notFound("No files found for this lesson");
      }
      return files;
    } catch (error) {
      throw error;
    }
  }

  async getFileById(id) {
    try {
      const file = await this.fileRepository.findById(id);
      if (!file) {
        throw boom.notFound("File not found");
      }
      return file;
    } catch (error) {
      throw error;
    }
  }

  async updateFile(id, data) {
    try {
      const oldFile = await this.getFileById(id);
      
      const before = {};
      for (const key of Object.keys(data)) {
        before[key] = oldFile[key];
      }
      
      const newFile = await oldFile.update(data);
      
      const after = {};
      for (const key of Object.keys(data)) {
        after[key] = newFile[key];
      }
      
      return {
        before,
        after,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(id) {
    try {
      const file = await this.getFileById(id);
      
      // Eliminar archivo físico del servidor
      try {
        const filePath = path.join(__dirname, "../../uploads/files", file.filename);
        await fs.unlink(filePath);
      } catch (fsError) {
        console.warn("Could not delete physical file:", fsError.message);
      }
      
      // Eliminar registro de la base de datos
      return await file.destroy();
    } catch (error) {
      throw error;
    }
  }

  async downloadFile(id) {
    try {
      const file = await this.getFileById(id);
      
      // Leer archivo del servidor
      const filePath = path.join(__dirname, "../../uploads/files", file.filename);
      const buffer = await fs.readFile(filePath);
      
      return {
        buffer,
        filename: file.filename,
        mimeType: file.type,
      };
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw boom.notFound("Physical file not found");
      }
      throw error;
    }
  }
}

module.exports = FileService;