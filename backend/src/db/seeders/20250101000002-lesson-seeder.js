"use strict";

const { Lessons, Course } = require("../models");

module.exports = {
    async up(queryInterface, Sequelize) {
        const lessons = [
            // Lecciones para JavaScript desde Cero
            {
                id: "550e8400-e29b-41d4-a716-446655440021",
                courseTitle: "JavaScript desde Cero",
                name: "Introducción a JavaScript",
                description:
                    "Conceptos básicos, variables, tipos de datos y operadores en JavaScript.",
                videoUrl: "/uploads/lessons/js-intro.mp4",
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440022",
                courseTitle: "JavaScript desde Cero",
                name: "Funciones y Scope",
                description: "Aprende a crear y usar funciones, conceptos de scope y closures.",
                videoUrl: "/uploads/lessons/js-functions.mp4",
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440023",
                courseTitle: "JavaScript desde Cero",
                name: "Arrays y Objetos",
                description: "Manejo de arrays, objetos y métodos más utilizados.",
                videoUrl: "/uploads/lessons/js-arrays-objects.mp4",
            },

            // Lecciones para React.js Completo
            {
                id: "550e8400-e29b-41d4-a716-446655440024",
                courseTitle: "React.js Completo",
                name: "Introducción a React",
                description: "Conceptos básicos de React, JSX y componentes funcionales.",
                videoUrl: "/uploads/lessons/react-intro.mp4",
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440025",
                courseTitle: "React.js Completo",
                name: "Hooks en React",
                description: "useState, useEffect y otros hooks esenciales de React.",
                videoUrl: "/uploads/lessons/react-hooks.mp4",
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440026",
                courseTitle: "React.js Completo",
                name: "Routing con React Router",
                description: "Navegación entre páginas y manejo de rutas en React.",
                videoUrl: "/uploads/lessons/react-router.mp4",
            },

            // Lecciones para Node.js y Express
            {
                id: "550e8400-e29b-41d4-a716-446655440027",
                courseTitle: "Node.js y Express",
                name: "Introducción a Node.js",
                description:
                    "Conceptos básicos de Node.js, NPM y el ecosistema JavaScript del servidor.",
                videoUrl: "/uploads/lessons/nodejs-intro.mp4",
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440028",
                courseTitle: "Node.js y Express",
                name: "Express.js Básico",
                description: "Creación de servidores web con Express, rutas y middleware.",
                videoUrl: "/uploads/lessons/express-basic.mp4",
            },

            // Lecciones para Python
            {
                id: "550e8400-e29b-41d4-a716-446655440029",
                courseTitle: "Python para Principiantes",
                name: "Sintaxis de Python",
                description:
                    "Variables, tipos de datos, operadores y estructuras de control en Python.",
                videoUrl: "/uploads/lessons/python-syntax.mp4",
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440030",
                courseTitle: "Python para Principiantes",
                name: "Funciones y Módulos",
                description: "Creación de funciones, módulos y paquetes en Python.",
                videoUrl: "/uploads/lessons/python-functions.mp4",
            },
        ];

        for (const lesson of lessons) {
            // Buscar el curso por título para obtener su ID real
            const course = await Course.findOne({ where: { title: lesson.courseTitle } });
            if (!course) {
                console.log(
                    `Curso "${lesson.courseTitle}" no encontrado. Saltando lección "${lesson.name}".`
                );
                continue;
            }

            const lessonData = {
                ...lesson,
                courseId: course.id,
            };
            delete lessonData.courseTitle;

            const [lessonInstance, created] = await Lessons.findOrCreate({
                where: { name: lesson.name, courseId: course.id },
                defaults: lessonData,
            });
            if (created) {
                console.log(`Lección "${lesson.name}" creada correctamente.`);
            } else {
                console.log(`Lección "${lesson.name}" ya existe.`);
            }
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("lessons", null, {});
    },
};
