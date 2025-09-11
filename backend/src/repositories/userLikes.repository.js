const BaseRepopsitory = require("./base.repository");

class UserLikesRepository extends BaseRepopsitory {
    constructor(model) {
        super(model);
    }

    async findByUserAndLesson(userId, lessonId) {
        return this.model.findOne({
            where: { userId, lessonId },
            include: [
                {
                    association: "user",
                    attributes: ["id", "name", "email"],
                },
                {
                    association: "lesson",
                    attributes: ["id", "name", "description"],
                },
            ],
        });
    }

    async deleteAll(userId) {
        return this.model.destroy({
            where: { userId },
            force: true,
        });
    }

    async delete(userId, lessonId) {
        return this.model.destroy({
            where: { userId, lessonId },
            force: true,
        });
    }

    async getByUserId(userId) {
        return this.model.findAll({
            where: { userId },
            include: [
                {
                    association: "lesson",
                    attributes: ["id", "name", "description", "videoUrl"],
                    include: [
                        {
                            association: "course",
                            attributes: ["id", "title", "description"],
                        },
                    ],
                },
            ],
            order: [["created_at", "DESC"]],
        });
    }

    async getByLessonId(lessonId) {
        return this.model.findAll({
            where: { lessonId },
            include: [
                {
                    association: "user",
                    attributes: ["id", "name", "email"],
                },
            ],
            order: [["created_at", "DESC"]],
        });
    }

    async countByLessonId(lessonId) {
        return this.model.count({
            where: { lessonId },
        });
    }

    async countByUserId(userId) {
        return this.model.count({
            where: { userId },
        });
    }

    async getMostLikedLessons(limit = 10) {
        const { sequelize } = require("../db/models");

        return this.model.findAll({
            attributes: [
                "lessonId",
                [sequelize.fn("COUNT", sequelize.col("lessonId")), "likesCount"],
            ],
            include: [
                {
                    association: "lesson",
                    attributes: ["id", "name", "description", "videoUrl"],
                    include: [
                        {
                            association: "course",
                            attributes: ["id", "title", "description"],
                        },
                    ],
                },
            ],
            group: ["lessonId"],
            order: [[sequelize.literal("likesCount"), "DESC"]],
            limit,
        });
    }

    async getRecentLikes(limit = 20) {
        return this.model.findAll({
            include: [
                {
                    association: "user",
                    attributes: ["id", "name", "email"],
                },
                {
                    association: "lesson",
                    attributes: ["id", "name", "description"],
                    include: [
                        {
                            association: "course",
                            attributes: ["id", "title"],
                        },
                    ],
                },
            ],
            order: [["created_at", "DESC"]],
            limit,
        });
    }
}

module.exports = UserLikesRepository;
