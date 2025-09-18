"use strict";

const bcrypt = require("bcryptjs");
const { User } = require("../models");

module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash("123456Aa@", 10);

        const users = [
            {
                id: "550e8400-e29b-41d4-a716-446655440001",
                name: "Admin Principal",
                email: "admin@codeducation.com",
                password: hashedPassword,
                role: "admin",
                theme: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440002",
                name: "Profesor Juan Pérez",
                email: "juan.perez@codeducation.com",
                password: hashedPassword,
                role: "teacher",
                theme: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440003",
                name: "Profesora María García",
                email: "maria.garcia@codeducation.com",
                password: hashedPassword,
                role: "teacher",
                theme: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440004",
                name: "Estudiante Carlos López",
                email: "carlos.lopez@codeducation.com",
                password: hashedPassword,
                role: "student",
                theme: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440005",
                name: "Estudiante Ana Martínez",
                email: "ana.martinez@codeducation.com",
                password: hashedPassword,
                role: "student",
                theme: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440006",
                name: "Estudiante Pedro Rodríguez",
                email: "pedro.rodriguez@codeducation.com",
                password: hashedPassword,
                role: "student",
                theme: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440007",
                name: "Profesor Roberto Silva",
                email: "roberto.silva@codeducation.com",
                password: hashedPassword,
                role: "teacher",
                theme: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440008",
                name: "Estudiante Laura Fernández",
                email: "laura.fernandez@codeducation.com",
                password: hashedPassword,
                role: "student",
                theme: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440009",
                name: "Estudiante Miguel Torres",
                email: "miguel.torres@codeducation.com",
                password: hashedPassword,
                role: "student",
                theme: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440010",
                name: "Profesora Carmen Ruiz",
                email: "carmen.ruiz@codeducation.com",
                password: hashedPassword,
                role: "teacher",
                theme: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];

        for (const user of users) {
            const [userInstance, created] = await User.findOrCreate({
                where: { email: user.email },
                defaults: user
            });
            if (created) {
                console.log(`Usuario ${user.name} creado correctamente.`);
            } else {
                console.log(`Usuario con email ${user.email} ya existe. Actualizando si es necesario.`);
            }
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    },
};
