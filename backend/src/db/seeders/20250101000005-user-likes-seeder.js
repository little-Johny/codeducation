'use strict';

const { UserLikes, User, Lessons } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const userLikes = [
      // Carlos López (estudiante) - likes a lecciones
      {
        id: '550e8400-e29b-41d4-a716-446655440061',
        userEmail: 'carlos.lopez@codeducation.com',
        lessonName: 'Introducción a JavaScript'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440062',
        userEmail: 'carlos.lopez@codeducation.com',
        lessonName: 'Funciones y Scope'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440063',
        userEmail: 'carlos.lopez@codeducation.com',
        lessonName: 'Introducción a React'
      },

      // Ana Martínez (estudiante) - likes a lecciones
      {
        id: '550e8400-e29b-41d4-a716-446655440064',
        userEmail: 'ana.martinez@codeducation.com',
        lessonName: 'Introducción a Node.js'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440065',
        userEmail: 'ana.martinez@codeducation.com',
        lessonName: 'Express.js Básico'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440066',
        userEmail: 'ana.martinez@codeducation.com',
        lessonName: 'Sintaxis de Python'
      },

      // Pedro Rodríguez (estudiante) - likes a lecciones
      {
        id: '550e8400-e29b-41d4-a716-446655440067',
        userEmail: 'pedro.rodriguez@codeducation.com',
        lessonName: 'Introducción a JavaScript'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440068',
        userEmail: 'pedro.rodriguez@codeducation.com',
        lessonName: 'Arrays y Objetos'
      },

      // Laura Fernández (estudiante) - likes a lecciones
      {
        id: '550e8400-e29b-41d4-a716-446655440069',
        userEmail: 'laura.fernandez@codeducation.com',
        lessonName: 'Introducción a React'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440070',
        userEmail: 'laura.fernandez@codeducation.com',
        lessonName: 'Hooks en React'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440071',
        userEmail: 'laura.fernandez@codeducation.com',
        lessonName: 'Routing con React Router'
      },

      // Miguel Torres (estudiante) - likes a lecciones
      {
        id: '550e8400-e29b-41d4-a716-446655440072',
        userEmail: 'miguel.torres@codeducation.com',
        lessonName: 'Introducción a Node.js'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440073',
        userEmail: 'miguel.torres@codeducation.com',
        lessonName: 'Sintaxis de Python'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440074',
        userEmail: 'miguel.torres@codeducation.com',
        lessonName: 'Funciones y Módulos'
      }
    ];

    for (const like of userLikes) {
      // Buscar el usuario por email
      const user = await User.findOne({ where: { email: like.userEmail } });
      if (!user) {
        console.log(`Usuario con email ${like.userEmail} no encontrado. Saltando like.`);
        continue;
      }

      // Buscar la lección por nombre
      const lesson = await Lessons.findOne({ where: { name: like.lessonName } });
      if (!lesson) {
        console.log(`Lección "${like.lessonName}" no encontrada. Saltando like.`);
        continue;
      }

      const likeData = {
        ...like,
        userId: user.id,
        lessonId: lesson.id
      };
      delete likeData.userEmail;
      delete likeData.lessonName;

      const [likeInstance, created] = await UserLikes.findOrCreate({
        where: { userId: user.id, lessonId: lesson.id },
        defaults: likeData
      });
      if (created) {
        console.log(`Like creado: ${user.email} -> ${lesson.name}`);
      } else {
        console.log(`Like ya existe: ${user.email} -> ${lesson.name}`);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_likes', null, {});
  }
};