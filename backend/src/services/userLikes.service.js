const boom = require("@hapi/boom");
const { sequelize } = require("../db/models");

class UserLikesService {
  constructor(userLikesRepository) {
    this.userLikesRepository = userLikesRepository;
  }

  async likeLesson(userId, lessonId) {
    try {
      // Verificar que el usuario existe
      const { User } = require("../db/models");
      const user = await User.findByPk(userId);
      if (!user) {
        throw boom.notFound("User not found");
      }

      // Verificar que la lección existe
      const { Lessons } = require("../db/models");
      const lesson = await Lessons.findByPk(lessonId);
      if (!lesson) {
        throw boom.notFound("Lesson not found");
      }

      // Verificar si ya existe el like
      const existingLike = await this.userLikesRepository.findByUserAndLesson(userId, lessonId);
      if (existingLike) {
        throw boom.conflict("User has already liked this lesson");
      }

      // Crear el like
      const like = await this.userLikesRepository.create({ userId, lessonId });
      return like;
    } catch (error) {
      throw error;
    }
  }

  async unlikeLesson(userId, lessonId) {
    try {
      const like = await this.userLikesRepository.findByUserAndLesson(userId, lessonId);
      if (!like) {
        throw boom.notFound("Like not found");
      }

      await like.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getUserLikes(userId) {
    try {
      const likes = await this.userLikesRepository.getByUserId(userId);
      return likes;
    } catch (error) {
      throw error;
    }
  }

  async getLessonLikes(lessonId) {
    try {
      const likes = await this.userLikesRepository.getByLessonId(lessonId);
      return likes;
    } catch (error) {
      throw error;
    }
  }

  async checkUserLike(userId, lessonId) {
    try {
      const like = await this.userLikesRepository.findByUserAndLesson(userId, lessonId);
      return !!like;
    } catch (error) {
      throw error;
    }
  }

  async getLikesCount(lessonId) {
    try {
      const count = await this.userLikesRepository.countByLessonId(lessonId);
      return count;
    } catch (error) {
      throw error;
    }
  }

  async toggleLike(userId, lessonId) {
    const transaction = await sequelize.transaction();
    
    try {
      // Verificar que el usuario existe
      const { User } = require("../db/models");
      const user = await User.findByPk(userId);
      if (!user) {
        throw boom.notFound("User not found");
      }

      // Verificar que la lección existe
      const { Lessons } = require("../db/models");
      const lesson = await Lessons.findByPk(lessonId);
      if (!lesson) {
        throw boom.notFound("Lesson not found");
      }

      // Buscar like existente
      const existingLike = await this.userLikesRepository.findByUserAndLesson(userId, lessonId);
      
      if (existingLike) {
        // Si existe, eliminarlo
        await existingLike.destroy({ transaction });
        await transaction.commit();
        return { liked: false, message: "Like removed" };
      } else {
        // Si no existe, crearlo
        const newLike = await this.userLikesRepository.create({ userId, lessonId }, { transaction });
        await transaction.commit();
        return { liked: true, like: newLike, message: "Like added" };
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = UserLikesService;