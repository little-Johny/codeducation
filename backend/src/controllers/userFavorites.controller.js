class UserFavoritesController {
  constructor(userFavoritesService) {
    this.userFavoritesService = userFavoritesService;
    this.addFavorite = this.addFavorite.bind(this);
    this.getByUserId = this.getByUserId.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
    this.deleteAllFavorites = this.deleteAllFavorites.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.getFavoritesCount = this.getFavoritesCount.bind(this);
  }

  async getByUserId(req, res, next) {
    try {
      const favorites = await this.userFavoritesService.getByUserId(
        req.params.userId
      );
      res.success(favorites, "Cursos favoritos obtenidos exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async addFavorite(req, res, next) {
    try {
      const favorite = await this.userFavoritesService.add(req.body);
      res.success(favorite, "Curso favorito agregado exitosamente", 201);
    } catch (error) {
      next(error);
    }
  }

  async deleteFavorite(req, res, next) {
    try {
      const favorite = await this.userFavoritesService.delete(
        req.params.userId,
        req.body.courseId
      );
      res.success(favorite, "Curso favorito eliminado exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async deleteAllFavorites(req, res, next) {
    try {
      const favorite = await this.userFavoritesService.deleteAll(
        req.params.userId
      );
      res.success(favorite, "Cursos favoritos eliminados exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async checkFavorite(req, res, next) {
    try {
      const { userId, courseId } = req.params;
      const isFavorite = await this.userFavoritesService.checkFavorite(userId, courseId);
      res.success({ isFavorite }, "Estado del favorito obtenido exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async toggleFavorite(req, res, next) {
    try {
      const { userId, courseId } = req.body;
      const result = await this.userFavoritesService.toggleFavorite(userId, courseId);
      res.success(result, result.favorited ? "Curso agregado a favoritos" : "Curso eliminado de favoritos");
    } catch (error) {
      next(error);
    }
  }

  async getFavoritesCount(req, res, next) {
    try {
      const { userId } = req.params;
      const count = await this.userFavoritesService.getFavoritesCount(userId);
      res.success({ count }, "Conteo de favoritos obtenido exitosamente");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserFavoritesController;
