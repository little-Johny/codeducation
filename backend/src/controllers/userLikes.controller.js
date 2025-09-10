class UserLikesController {
  constructor(userLikesService) {
    this.userLikesService = userLikesService;
    this.likeLesson = this.likeLesson.bind(this);
    this.unlikeLesson = this.unlikeLesson.bind(this);
    this.getUserLikes = this.getUserLikes.bind(this);
    this.getLessonLikes = this.getLessonLikes.bind(this);
    this.checkUserLike = this.checkUserLike.bind(this);
    this.getLikesCount = this.getLikesCount.bind(this);
  }

  async likeLesson(req, res, next) {
    try {
      const { userId, lessonId } = req.body;
      const like = await this.userLikesService.likeLesson(userId, lessonId);
      res.success(like, "Lección marcada como me gusta", 201);
    } catch (error) {
      next(error);
    }
  }

  async unlikeLesson(req, res, next) {
    try {
      const { userId, lessonId } = req.body;
      await this.userLikesService.unlikeLesson(userId, lessonId);
      res.success(null, "Me gusta eliminado exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async getUserLikes(req, res, next) {
    try {
      const { userId } = req.params;
      const likes = await this.userLikesService.getUserLikes(userId);
      res.success(likes, "Likes del usuario obtenidos exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async getLessonLikes(req, res, next) {
    try {
      const { lessonId } = req.params;
      const likes = await this.userLikesService.getLessonLikes(lessonId);
      res.success(likes, "Likes de la lección obtenidos exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async checkUserLike(req, res, next) {
    try {
      const { userId, lessonId } = req.params;
      const hasLiked = await this.userLikesService.checkUserLike(userId, lessonId);
      res.success({ hasLiked }, "Estado del like obtenido exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async getLikesCount(req, res, next) {
    try {
      const { lessonId } = req.params;
      const count = await this.userLikesService.getLikesCount(lessonId);
      res.success({ count }, "Conteo de likes obtenido exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async toggleLike(req, res, next) {
    try {
      const { userId, lessonId } = req.body;
      const result = await this.userLikesService.toggleLike(userId, lessonId);
      res.success(result, result.liked ? "Lección marcada como me gusta" : "Me gusta eliminado");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserLikesController;