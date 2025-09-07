"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("courses", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        comment: "Identificador del curso",
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users", // referencia a la tabla users
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        comment: "Relacion con usuarios",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: "Titulo del curso",
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Imagen de portada del curso",
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Categoria del curso",
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Descripcion basica del curso",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("courses");
  },
};
