"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lessons", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        comment: "Identificador de la leccion",
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
        comment: "Relacion con el curso al que pertenece la leccion",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Nombre de la leccion",
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Descripcion de la leccion",
      },
      video_url: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "URL del video de la leccion",
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
    await queryInterface.dropTable("lessons");
  },
};
