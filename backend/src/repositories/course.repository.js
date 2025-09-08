const BaseRepopsitory = require("./base.repository");

class CourseRepository extends BaseRepopsitory {
  constructor(model) {
    super(model);
  }

  async getByCategory(category) {
    return this.model.findAll({
      where: { category },
    });
  }
}

module.exports = CourseRepository;
