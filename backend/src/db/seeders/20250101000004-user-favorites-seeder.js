'use strict';

const { UserFavorites, User, Course } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const userFavorites = [
      // Carlos López (estudiante) - favoritos
      {
        id: '550e8400-e29b-41d4-a716-446655440041',
        userEmail: 'carlos.lopez@codeducation.com',
        courseTitle: 'JavaScript desde Cero'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440042',
        userEmail: 'carlos.lopez@codeducation.com',
        courseTitle: 'React.js Completo'
      },

      // Ana Martínez (estudiante) - favoritos
      {
        id: '550e8400-e29b-41d4-a716-446655440043',
        userEmail: 'ana.martinez@codeducation.com',
        courseTitle: 'Node.js y Express'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440044',
        userEmail: 'ana.martinez@codeducation.com',
        courseTitle: 'Python para Principiantes'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440045',
        userEmail: 'ana.martinez@codeducation.com',
        courseTitle: 'CSS Avanzado y Flexbox'
      },

      // Pedro Rodríguez (estudiante) - favoritos
      {
        id: '550e8400-e29b-41d4-a716-446655440046',
        userEmail: 'pedro.rodriguez@codeducation.com',
        courseTitle: 'JavaScript desde Cero'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440047',
        userEmail: 'pedro.rodriguez@codeducation.com',
        courseTitle: 'Base de Datos con PostgreSQL'
      },

      // Laura Fernández (estudiante) - favoritos
      {
        id: '550e8400-e29b-41d4-a716-446655440048',
        userEmail: 'laura.fernandez@codeducation.com',
        courseTitle: 'React.js Completo'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440049',
        userEmail: 'laura.fernandez@codeducation.com',
        courseTitle: 'CSS Avanzado y Flexbox'
      },

      // Miguel Torres (estudiante) - favoritos
      {
        id: '550e8400-e29b-41d4-a716-446655440050',
        userEmail: 'miguel.torres@codeducation.com',
        courseTitle: 'Node.js y Express'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440051',
        userEmail: 'miguel.torres@codeducation.com',
        courseTitle: 'Python para Principiantes'
      }
    ];

    for (const favorite of userFavorites) {
      // Buscar el usuario por email
      const user = await User.findOne({ where: { email: favorite.userEmail } });
      if (!user) {
        console.log(`Usuario con email ${favorite.userEmail} no encontrado. Saltando favorito.`);
        continue;
      }

      // Buscar el curso por título
      const course = await Course.findOne({ where: { title: favorite.courseTitle } });
      if (!course) {
        console.log(`Curso "${favorite.courseTitle}" no encontrado. Saltando favorito.`);
        continue;
      }

      const favoriteData = {
        ...favorite,
        userId: user.id,
        courseId: course.id
      };
      delete favoriteData.userEmail;
      delete favoriteData.courseTitle;

      const [favoriteInstance, created] = await UserFavorites.findOrCreate({
        where: { userId: user.id, courseId: course.id },
        defaults: favoriteData
      });
      if (created) {
        console.log(`Favorito creado: ${user.email} -> ${course.title}`);
      } else {
        console.log(`Favorito ya existe: ${user.email} -> ${course.title}`);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_favorites', null, {});
  }
};