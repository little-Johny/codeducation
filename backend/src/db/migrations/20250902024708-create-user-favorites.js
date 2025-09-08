"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_favorites", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        comment: "Identificador de el favorito",
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
        comment: "Relacion con el usuario que selecciono el favorito",
      },
      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "courses",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        comment: "Relacion con el curso al que se selecciono como favorito",
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

    await queryInterface.addConstraint("user_favorites", {
      fields: ["user_id", "course_id"],
      type: "unique",
      name: "user_favorites_unique",
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_favorites");
  },
};
