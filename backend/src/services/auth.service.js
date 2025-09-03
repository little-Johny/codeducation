const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(data) {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const user = await this.userRepository.create(data);
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    user.token = token;

    return user;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return { user, token};
  }
}

module.exports = AuthService;