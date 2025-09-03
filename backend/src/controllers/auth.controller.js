class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res, next) {
    try {
      const user = await this.authService.register(req.body);
      return res.succes(user, "Usuario registrado exitosamente", 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      return res.success(result, "Usuario loggeado exitosamente");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;