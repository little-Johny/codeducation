const BaseRepository = require("./base.repository");

class UserRepository extends BaseRepository{
  constructor(model) {
    super(model);
  };

  async findByEmail(email) {
    return this.model.findOne({
      where: {
        email,
      },
    });
  };

  

}


module.exports = UserRepository;


