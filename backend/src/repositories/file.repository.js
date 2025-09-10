const BaseRepopsitory = require("./base.repository");

class FileRepository extends BaseRepopsitory {
  constructor(model) {
    super(model);
  }

  async getByLessonId(lessonId) {
    return this.model.findAll({
      where: { lessonId },
      include: [
        {
          association: "lesson",
          attributes: ["id", "name", "description"]
        }
      ],
      order: [["created_at", "DESC"]]
    });
  }

  async getByType(type) {
    return this.model.findAll({
      where: { type },
      include: [
        {
          association: "lesson",
          attributes: ["id", "name", "description"]
        }
      ],
      order: [["created_at", "DESC"]]
    });
  }

  async getRecentFiles(limit = 10) {
    return this.model.findAll({
      include: [
        {
          association: "lesson",
          attributes: ["id", "name", "description"]
        }
      ],
      order: [["created_at", "DESC"]],
      limit
    });
  }
}

module.exports = FileRepository;