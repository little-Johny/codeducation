const { Lessons, User } = require("../db/models");

const BaseRepopsitory = require("./base.repository");

class CourseRepository extends BaseRepopsitory {
    constructor(model) {
        super(model);
    }

    async getCourseById(id) {
        return this.model.findByPk(id, {
            include: [
                { model: Lessons, as: "lessons" },
                { model: User, as: "author" },
            ],
        });
    }

    async getByCategory(category) {
        return this.model.findAll({
            where: { category },
        });
    }
}

module.exports = CourseRepository;
