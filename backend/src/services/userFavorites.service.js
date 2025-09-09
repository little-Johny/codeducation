const boom = require("@hapi/boom");
const { sequelize } = require("../db/models");
const UserService = require("./user.service");
const CourseService = require("./course.service");

class UserFavoritesService {
    constructor(userFavoritesRepository, userRepository, courseRepository) {
        this.userFavoritesRepository = userFavoritesRepository;
        this.userService = new UserService(userRepository);
        this.courseService = new CourseService(courseRepository);
    }

    async getById(userId) {
        return await this.userFavoritesRepository.getById(userId);
    }

    async getByUserId(userId) {
        const favorites = await this.userFavoritesRepository.getByUserId(userId);
        if (!favorites) throw boom.notFound("Favorites not found");
        return favorites;
    }

    async add(data) {
        const transaction = await sequelize.transaction();
        try {
            // Validar usuario
            await this.userService.getUserById(data.userId);

            // Validar curso
            await this.courseService.getCourseById(data.courseId);

            console.log("DATA:", data);
            // Crear favorito
            const favorite = await this.userFavoritesRepository.create(data, { transaction });

            await transaction.commit();
            return favorite;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async delete(userId, courseId) {
        const deleted = await this.userFavoritesRepository.delete(userId, courseId);
        if (!deleted) throw boom.notFound("Favorite not found");
        return deleted;
    }

    async deleteAll(userId) {
        return await this.userFavoritesRepository.deleteAll(userId);
    }
}

module.exports = UserFavoritesService;
