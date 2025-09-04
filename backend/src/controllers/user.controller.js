class UserController {
  constructor(userService) {
    this.userService = userService;
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
  }

  async getUsers(req, res, next) {
    try {
      const users = await this.userService.getUsers();
      res.success(users, "Usuarios obtenidos exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;