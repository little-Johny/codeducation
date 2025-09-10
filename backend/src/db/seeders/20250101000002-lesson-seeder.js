'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const lessons = [
      // Lecciones para JavaScript desde Cero
      {
        id: '550e8400-e29b-41d4-a716-446655440021',
        courseId: '550e8400-e29b-41d4-a716-446655440011',
        name: 'Introducción a JavaScript',
        description: 'Conceptos básicos, variables, tipos de datos y operadores en JavaScript.',
        videoUrl: '/uploads/lessons/js-intro.mp4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440022',
        courseId: '550e8400-e29b-41d4-a716-446655440011',
        name: 'Funciones y Scope',
        description: 'Aprende a crear y usar funciones, conceptos de scope y closures.',
        videoUrl: '/uploads/lessons/js-functions.mp4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440023',
        courseId: '550e8400-e29b-41d4-a716-446655440011',
        name: 'Arrays y Objetos',
        description: 'Manejo de arrays, objetos y métodos más utilizados.',
        videoUrl: '/uploads/lessons/js-arrays-objects.mp4',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Lecciones para React.js Completo
      {
        id: '550e8400-e29b-41d4-a716-446655440024',
        courseId: '550e8400-e29b-41d4-a716-446655440012',
        name: 'Introducción a React',
        description: 'Conceptos básicos de React, JSX y componentes funcionales.',
        videoUrl: '/uploads/lessons/react-intro.mp4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440025',
        courseId: '550e8400-e29b-41d4-a716-446655440012',
        name: 'Hooks en React',
        description: 'useState, useEffect y otros hooks esenciales de React.',
        videoUrl: '/uploads/lessons/react-hooks.mp4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440026',
        courseId: '550e8400-e29b-41d4-a716-446655440012',
        name: 'Routing con React Router',
        description: 'Navegación entre páginas y manejo de rutas en React.',
        videoUrl: '/uploads/lessons/react-router.mp4',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Lecciones para Node.js y Express
      {
        id: '550e8400-e29b-41d4-a716-446655440027',
        courseId: '550e8400-e29b-41d4-a716-446655440013',
        name: 'Introducción a Node.js',
        description: 'Conceptos básicos de Node.js, NPM y el ecosistema JavaScript del servidor.',
        videoUrl: '/uploads/lessons/nodejs-intro.mp4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440028',
        courseId: '550e8400-e29b-41d4-a716-446655440013',
        name: 'Express.js Básico',
        description: 'Creación de servidores web con Express, rutas y middleware.',
        videoUrl: '/uploads/lessons/express-basic.mp4',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Lecciones para Python
      {
        id: '550e8400-e29b-41d4-a716-446655440029',
        courseId: '550e8400-e29b-41d4-a716-446655440014',
        name: 'Sintaxis de Python',
        description: 'Variables, tipos de datos, operadores y estructuras de control en Python.',
        videoUrl: '/uploads/lessons/python-syntax.mp4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440030',
        courseId: '550e8400-e29b-41d4-a716-446655440014',
        name: 'Funciones y Módulos',
        description: 'Creación de funciones, módulos y paquetes en Python.',
        videoUrl: '/uploads/lessons/python-functions.mp4',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('lessons', lessons, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lessons', null, {});
  }
};