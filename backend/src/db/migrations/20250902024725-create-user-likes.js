"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_likes", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        comment: "Identificador de el like",
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        comment: "Relacion con el usuario que dio like",
      },
      lesson_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "lessons",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        comment: "Relacion con la leccion a la que se le dio like",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("user_likes", {
      fields: ["user_id", "lesson_id"],
      type: "unique",
      name: "user_lesson_unique",
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_likes");
  },
};
