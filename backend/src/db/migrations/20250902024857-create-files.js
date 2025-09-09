"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("files", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        comment: "Identificador del archivo",
      },
      lesson_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "lessons",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "Relacion con la lecciona la que pertenece el archivo",
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Nombre del archivo",
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "URL del archivo",
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Tipo de archivo",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("files");
  },
};
