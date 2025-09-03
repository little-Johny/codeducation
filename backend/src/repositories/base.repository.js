class BaseRepopsitory {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findAll() {
    return this.model.findAll();
  }

  async findById(id) {
    return this.model.findByPk(id);
  }

  async update(id, changes) {
    return this.model.update(changes, {
      where: {
        id,
      },
    });
  }

  async delete(id) {
    return this.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = BaseRepopsitory;