const User = require("../db/models/user");

class userRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const user = await this.model.create(data);
    return user;
  }
}
