require("dotenv").config();
const { sequelize, User } = require("../../db/models");
const UserRepository = require("./../../repositories/user.repository");
const AuthService = require("./../../services/auth.service");

const userRepository = new UserRepository(User);
const authService = new AuthService(userRepository);

(async () => {
  try {
    await sequelize.authenticate();

    const user = await authService.register({
      name: "Admin",
      email: "admin@example.com",
      password: "123456", // debería encriptar
      role: "admin",
    });

    console.log("Usuario creado exitosamente", user.toJSON());
    process.exit(0);
  } catch (error) {
    console.error("Error al crear el usuario", error);
    process.exit(1);
  }
})();
