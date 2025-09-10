'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const courses = [
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        title: 'JavaScript desde Cero',
        description: 'Aprende JavaScript desde los fundamentos hasta conceptos avanzados. Perfecto para principiantes que quieren dominar el lenguaje más popular del desarrollo web.',
        category: 'programming',
        userId: '550e8400-e29b-41d4-a716-446655440002',
        image: '/uploads/courses/javascript-course.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440012',
        title: 'React.js Completo',
        description: 'Domina React.js con hooks, context, routing y las mejores prácticas. Construye aplicaciones modernas y escalables.',
        category: 'frontend',
        userId: '550e8400-e29b-41d4-a716-446655440002',
        image: '/uploads/courses/react-course.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440013',
        title: 'Node.js y Express',
        description: 'Desarrollo backend con Node.js y Express. Aprende a crear APIs RESTful, manejo de bases de datos y autenticación.',
        category: 'backend',
        userId: '550e8400-e29b-41d4-a716-446655440003',
        image: '/uploads/courses/nodejs-course.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440014',
        title: 'Python para Principiantes',
        description: 'Introducción completa a Python. Desde sintaxis básica hasta programación orientada a objetos y manejo de datos.',
        category: 'programming',
        userId: '550e8400-e29b-41d4-a716-446655440007',
        image: '/uploads/courses/python-course.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440015',
        title: 'CSS Avanzado y Flexbox',
        description: 'Domina CSS moderno con Flexbox, Grid, animaciones y responsive design. Crea interfaces hermosas y funcionales.',
        category: 'frontend',
        userId: '550e8400-e29b-41d4-a716-446655440010',
        image: '/uploads/courses/css-course.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440016',
        title: 'Base de Datos con PostgreSQL',
        description: 'Aprende diseño de bases de datos, consultas SQL avanzadas, índices y optimización con PostgreSQL.',
        category: 'database',
        userId: '550e8400-e29b-41d4-a716-446655440003',
        image: '/uploads/courses/postgresql-course.jpg',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('courses', courses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', null, {});
  }
};