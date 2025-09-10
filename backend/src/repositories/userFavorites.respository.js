const BaseRepository = require("./base.repository");

class UserFavoritesRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async getByUserId(userId) {
    return this.model.findAll({
      where: { userId },
      include: [
        {
          association: "course",
          attributes: ["id", "title", "description", "category", "image"]
        }
      ],
      order: [["created_at", "DESC"]]
    });
  }

  async findByUserAndCourse(userId, courseId) {
    return this.model.findOne({
      where: { userId, courseId },
      include: [
        {
          association: "user",
          attributes: ["id", "name", "email"]
        },
        {
          association: "course",
          attributes: ["id", "title", "description"]
        }
      ]
    });
  }

  async deleteAll(userId) {
    return this.model.destroy({
      where: { userId },
      force: true,
    });
  }

  async delete(userId, courseId) {
    return this.model.destroy({
      where: { userId, courseId },
      force: true,
    });
  }

  async countByUserId(userId) {
    return this.model.count({
      where: { userId }
    });
  }

  async getMostFavoritedCourses(limit = 10) {
    const { sequelize } = require("../db/models");
    
    return this.model.findAll({
      attributes: [
        'courseId',
        [sequelize.fn('COUNT', sequelize.col('courseId')), 'favoritesCount']
      ],
      include: [
        {
          association: "course",
          attributes: ["id", "title", "description", "category", "image"]
        }
      ],
      group: ['courseId'],
      order: [[sequelize.literal('favoritesCount'), 'DESC']],
      limit
    });
  }

  async getRecentFavorites(limit = 20) {
    return this.model.findAll({
      include: [
        {
          association: "user",
          attributes: ["id", "name", "email"]
        },
        {
          association: "course",
          attributes: ["id", "title", "description", "category"]
        }
      ],
      order: [["created_at", "DESC"]],
      limit
    });
  }
}

module.exports = UserFavoritesRepository;
