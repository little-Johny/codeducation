"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"), // Postgres requiere extensión uuid-ossp
        primaryKey: true,
        allowNull: false,
        comment: "Identificador del usuario",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Nombre de usuario",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: "Correo electronico del usuario",
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Contraseña del usuario",
      },
      role: {
        type: Sequelize.ENUM("student", "teacher", "admin"),
        allowNull: false,
        defaultValue: "student",
        comment: "Rol asignado al usuario(estudiante, maestro, admin)",
      },
      theme: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, // false = dark theme
        comment: "Preferencia del tema del usuario"
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
    // Primero eliminamos el ENUM porque Postgres no lo elimina solo
    await queryInterface.dropTable("users");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Users_role";'
    );
  },
};
