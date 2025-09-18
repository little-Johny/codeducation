"use strict";

const { Lessons, Files } = require("../models");

module.exports = {
    async up(queryInterface, Sequelize) {
        const files = [
            // Archivos para lecciones de JavaScript
            {
                id: "550e8400-e29b-41d4-a716-446655440031",
                lessonName: "Introducción a JavaScript",
                filename: "ejercicios-variables.js",
                url: "/uploads/files/ejercicios-variables.js",
                type: "application/javascript"
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440032",
                lessonName: "Introducción a JavaScript",
                filename: "guia-javascript.pdf",
                url: "/uploads/files/guia-javascript.pdf",
                type: "application/pdf"
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440033",
                lessonName: "Funciones y Scope",
                filename: "ejercicios-funciones.js",
                url: "/uploads/files/ejercicios-funciones.js",
                type: "application/javascript"
            },

            // Archivos para lecciones de React
            {
                id: "550e8400-e29b-41d4-a716-446655440034",
                lessonName: "Introducción a React",
                filename: "componente-ejemplo.jsx",
                url: "/uploads/files/componente-ejemplo.jsx",
                type: "text/javascript"
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440035",
                lessonName: "Hooks en React",
                filename: "hooks-guia.pdf",
                url: "/uploads/files/hooks-guia.pdf",
                type: "application/pdf"
            },

            // Archivos para lecciones de Node.js
            {
                id: "550e8400-e29b-41d4-a716-446655440036",
                lessonName: "Introducción a Node.js",
                filename: "servidor-basico.js",
                url: "/uploads/files/servidor-basico.js",
                type: "application/javascript"
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440037",
                lessonName: "Express.js Básico",
                filename: "express-rutas.js",
                url: "/uploads/files/express-rutas.js",
                type: "application/javascript"
            },

            // Archivos para lecciones de Python
            {
                id: "550e8400-e29b-41d4-a716-446655440038",
                lessonName: "Sintaxis de Python",
                filename: "ejercicios-python.py",
                url: "/uploads/files/ejercicios-python.py",
                type: "text/x-python"
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440039",
                lessonName: "Funciones y Módulos",
                filename: "modulos-ejemplo.py",
                url: "/uploads/files/modulos-ejemplo.py",
                type: "text/x-python"
            }
        ];

        for (const file of files) {
            // Buscar la lección por nombre para obtener su ID real
            const lesson = await Lessons.findOne({ where: { name: file.lessonName } });
            if (!lesson) {
                console.log(`Lección "${file.lessonName}" no encontrada. Saltando archivo "${file.filename}".`);
                continue;
            }

            const fileData = {
                ...file,
                lessonId: lesson.id
            };
            delete fileData.lessonName;

            const [fileInstance, created] = await Files.findOrCreate({
                where: { filename: file.filename, lessonId: lesson.id },
                defaults: fileData
            });
            if (created) {
                console.log(`Archivo "${file.filename}" creado correctamente.`);
            } else {
                console.log(`Archivo "${file.filename}" ya existe.`);
            }
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("files", null, {});
    },
};
