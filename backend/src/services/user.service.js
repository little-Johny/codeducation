class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async updateUser(id, data) {
    return await this.userRepository.update(id, data);
  }

  async deleteUser(id) {
    return await this.userRepository.delete(id);
  }
}

module.exports = UserService;
