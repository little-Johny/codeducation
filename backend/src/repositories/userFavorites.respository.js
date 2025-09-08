const BaseRepsotory = require("./base.repository");

class UserFavoritesRepository extends BaseRepsotory {
  constructor(model) {
    super(model);
  }

  async getByUserId(userId) {
    return this.model.findAll({
      where: { userId },
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
}

module.exports = UserFavoritesRepository;
