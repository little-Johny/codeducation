class UserController {
  constructor(userService) {
    this.userService = userService;
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
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
      res.success(user, "Usuario obtenido exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.success(user, "Usuario actualizado exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      await this.userService.deleteUser(id);
      res.success(id, "Usuario eliminado exitosamente");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
