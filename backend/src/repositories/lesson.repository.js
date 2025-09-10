const BaseRepopsitory = require("./base.repository");

class LessonRepository extends BaseRepopsitory {
  constructor(model) {
    super(model);
  }

  async getByCourseId(courseId) {
    return this.model.findAll({
      where: { courseId },
      include: [
        {
          association: "course",
          attributes: ["id", "title", "description"]
        }
      ]
    });
  }
}

module.exports = LessonRepository;