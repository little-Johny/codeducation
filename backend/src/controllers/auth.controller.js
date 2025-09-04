class AuthController {
  constructor(authService) {
    this.authService = authService;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getSession = this.getSession.bind(this);
  }

  async register(req, res, next) {
    try {
      const user = await this.authService.register(req.body);
      return res.success(user, "Usuario registrado exitosamente", 201);
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

  async getSession(req, res, next) {
    try {
      const session = req.user;
      return res.success(session, "Sesion obtenida exitosamente");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
