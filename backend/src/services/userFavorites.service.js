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

    async checkFavorite(userId, courseId) {
        try {
            const favorite = await this.userFavoritesRepository.findByUserAndCourse(userId, courseId);
            return !!favorite;
        } catch (error) {
            throw error;
        }
    }

    async toggleFavorite(userId, courseId) {
        const transaction = await sequelize.transaction();
        
        try {
            // Verificar que el usuario existe
            await this.userService.getUserById(userId);

            // Verificar que el curso existe
            await this.courseService.getCourseById(courseId);

            // Buscar favorito existente
            const existingFavorite = await this.userFavoritesRepository.findByUserAndCourse(userId, courseId);
            
            if (existingFavorite) {
                // Si existe, eliminarlo
                await existingFavorite.destroy({ transaction, force: true });
                await transaction.commit();
                return { favorited: false, message: "Favorite removed" };
            } else {
                // Si no existe, crearlo
                const newFavorite = await this.userFavoritesRepository.create({ userId, courseId }, { transaction });
                await transaction.commit();
                return { favorited: true, favorite: newFavorite, message: "Favorite added" };
            }
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async getFavoritesCount(userId) {
        try {
            const count = await this.userFavoritesRepository.countByUserId(userId);
            return count;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserFavoritesService;
