class userFavoritesController {
  constructor(userFavoritesService) {
    this.userFavoritesService = userFavoritesService;
    this.addFavorite = this.addFavorite.bind(this);
    this.getByUserId = this.getByUserId.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
    this.deleteAllFavorites = this.deleteAllFavorites.bind(this);
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
      const { userId, courseId } = req.body;
      const favorite = await this.userFavoritesService.add(userId, courseId);
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
}

module.exports = userFavoritesController;
