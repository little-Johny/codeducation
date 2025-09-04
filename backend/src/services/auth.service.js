const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../db/models");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(data) {
    const transaction = await sequelize.transaction();
    try {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;

      const user = await this.userRepository.create(data, { transaction });

      const token = jwt.sign(
        { id: user.id, role: user.role, theme: user.theme },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const userObj = user.toJSON();
      delete userObj.password;

      await transaction.commit();
      return { user, token };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async login(email, password) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return { user, token };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
