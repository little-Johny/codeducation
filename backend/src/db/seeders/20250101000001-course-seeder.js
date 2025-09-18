'use strict';

const { Course, User } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Mapa de emails a userIds para los autores de cursos
    const userEmails = {
      '550e8400-e29b-41d4-a716-446655440002': 'juan.perez@codeducation.com',
      '550e8400-e29b-41d4-a716-446655440003': 'maria.garcia@codeducation.com',
      '550e8400-e29b-41d4-a716-446655440007': 'roberto.silva@codeducation.com',
      '550e8400-e29b-41d4-a716-446655440010': 'carmen.ruiz@codeducation.com'
    };

    const courses = [
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        title: 'JavaScript desde Cero',
        description: 'Aprende JavaScript desde los fundamentos hasta conceptos avanzados. Perfecto para principiantes que quieren dominar el lenguaje más popular del desarrollo web.',
        category: 'programming',
        userEmail: 'juan.perez@codeducation.com',
        image: '/uploads/courses/javascript-course.jpg'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440012',
        title: 'React.js Completo',
        description: 'Domina React.js con hooks, context, routing y las mejores prácticas. Construye aplicaciones modernas y escalables.',
        category: 'frontend',
        userEmail: 'juan.perez@codeducation.com',
        image: '/uploads/courses/react-course.jpg'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440013',
        title: 'Node.js y Express',
        description: 'Desarrollo backend con Node.js y Express. Aprende a crear APIs RESTful, manejo de bases de datos y autenticación.',
        category: 'backend',
        userEmail: 'maria.garcia@codeducation.com',
        image: '/uploads/courses/nodejs-course.jpg'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440014',
        title: 'Python para Principiantes',
        description: 'Introducción completa a Python. Desde sintaxis básica hasta programación orientada a objetos y manejo de datos.',
        category: 'programming',
        userEmail: 'roberto.silva@codeducation.com',
        image: '/uploads/courses/python-course.jpg'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440015',
        title: 'CSS Avanzado y Flexbox',
        description: 'Domina CSS moderno con Flexbox, Grid, animaciones y responsive design. Crea interfaces hermosas y funcionales.',
        category: 'frontend',
        userEmail: 'carmen.ruiz@codeducation.com',
        image: '/uploads/courses/css-course.jpg'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440016',
        title: 'Base de Datos con PostgreSQL',
        description: 'Aprende diseño de bases de datos, consultas SQL avanzadas, índices y optimización con PostgreSQL.',
        category: 'database',
        userEmail: 'maria.garcia@codeducation.com',
        image: '/uploads/courses/postgresql-course.jpg'
      }
    ];

    for (const course of courses) {
      // Buscar el usuario por email para obtener su ID real
      const user = await User.findOne({ where: { email: course.userEmail } });
      if (!user) {
        console.log(`Usuario con email ${course.userEmail} no encontrado. Saltando curso "${course.title}".`);
        continue;
      }

      const courseData = {
        ...course,
        userId: user.id
      };
      delete courseData.userEmail;

      const [courseInstance, created] = await Course.findOrCreate({
        where: { title: course.title },
        defaults: courseData
      });
      if (created) {
        console.log(`Curso "${course.title}" creado correctamente.`);
      } else {
        console.log(`Curso "${course.title}" ya existe.`);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', null, {});
  }
};