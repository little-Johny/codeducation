class FileController {
  constructor(fileService) {
    this.fileService = fileService;
    this.uploadFile = this.uploadFile.bind(this);
    this.getFilesByLesson = this.getFilesByLesson.bind(this);
    this.getFileById = this.getFileById.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }

  async uploadFile(req, res, next) {
    try {
      const { lessonId } = req.params;
      const file = req.file;
      
      if (!file) {
        return res.error("No se ha proporcionado ningún archivo", 400);
      }

      const newFile = await this.fileService.uploadFile(lessonId, file);
      res.success(newFile, "Archivo subido exitosamente", 201);
    } catch (error) {
      next(error);
    }
  }

  async getFilesByLesson(req, res, next) {
    try {
      const { lessonId } = req.params;
      const files = await this.fileService.getFilesByLesson(lessonId);
      res.success(files, "Archivos obtenidos exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async getFileById(req, res, next) {
    try {
      const { id } = req.params;
      const file = await this.fileService.getFileById(id);
      res.success(file, "Archivo obtenido exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async updateFile(req, res, next) {
    try {
      const { id } = req.params;
      const file = await this.fileService.updateFile(id, req.body);
      res.success(file, "Archivo actualizado exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async deleteFile(req, res, next) {
    try {
      const { id } = req.params;
      await this.fileService.deleteFile(id);
      res.success(id, "Archivo eliminado exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async downloadFile(req, res, next) {
    try {
      const { id } = req.params;
      const fileData = await this.fileService.downloadFile(id);
      
      res.setHeader('Content-Type', fileData.mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${fileData.filename}"`);
      res.send(fileData.buffer);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FileController;