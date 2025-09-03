class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id) {
    return this.userRepository.findById(id);
  }

  async updateUser(id, data) {
    return await this.userRepository.update(id, data);
  }

  async deleteUser(id) {
    return await this.userRepository.delete(id);
  }
}

module.exports = UserService;
