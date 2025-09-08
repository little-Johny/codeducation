const boom = require("@hapi/boom");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);

    if (!user) throw boom.notFound("User not found");

    return user;
  }

  async updateUser(id, data) {
    const oldUser = await this.getUserById(id);
    const before = {};
    for (const key of Object.keys(data)) {
      before[key] = oldUser[key];
    }
    const newUser = await oldUser.update(data);
    const after = {};
    for (const key of Object.keys(data)) {
      after[key] = newUser[key];
    }
    return {
      before,
      after,
    };
  }

  async deleteUser(id) {
    const user = await this.getUserById(id);
    return await user.destroy(id);
  }
}

module.exports = UserService;
