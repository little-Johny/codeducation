'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const files = [
      // Archivos para lecciones de JavaScript
      {
        id: '550e8400-e29b-41d4-a716-446655440031',
        lessonId: '550e8400-e29b-41d4-a716-446655440021',
        filename: 'ejercicios-variables.js',
        url: '/uploads/files/ejercicios-variables.js',
        type: 'application/javascript',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440032',
        lessonId: '550e8400-e29b-41d4-a716-446655440021',
        filename: 'guia-javascript.pdf',
        url: '/uploads/files/guia-javascript.pdf',
        type: 'application/pdf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440033',
        lessonId: '550e8400-e29b-41d4-a716-446655440022',
        filename: 'ejercicios-funciones.js',
        url: '/uploads/files/ejercicios-funciones.js',
        type: 'application/javascript',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Archivos para lecciones de React
      {
        id: '550e8400-e29b-41d4-a716-446655440034',
        lessonId: '550e8400-e29b-41d4-a716-446655440024',
        filename: 'componente-ejemplo.jsx',
        url: '/uploads/files/componente-ejemplo.jsx',
        type: 'text/javascript',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440035',
        lessonId: '550e8400-e29b-41d4-a716-446655440025',
        filename: 'hooks-guia.pdf',
        url: '/uploads/files/hooks-guia.pdf',
        type: 'application/pdf',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Archivos para lecciones de Node.js
      {
        id: '550e8400-e29b-41d4-a716-446655440036',
        lessonId: '550e8400-e29b-41d4-a716-446655440027',
        filename: 'servidor-basico.js',
        url: '/uploads/files/servidor-basico.js',
        type: 'application/javascript',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440037',
        lessonId: '550e8400-e29b-41d4-a716-446655440028',
        filename: 'express-rutas.js',
        url: '/uploads/files/express-rutas.js',
        type: 'application/javascript',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Archivos para lecciones de Python
      {
        id: '550e8400-e29b-41d4-a716-446655440038',
        lessonId: '550e8400-e29b-41d4-a716-446655440029',
        filename: 'ejercicios-python.py',
        url: '/uploads/files/ejercicios-python.py',
        type: 'text/x-python',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440039',
        lessonId: '550e8400-e29b-41d4-a716-446655440030',
        filename: 'modulos-ejemplo.py',
        url: '/uploads/files/modulos-ejemplo.py',
        type: 'text/x-python',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('files', files, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('files', null, {});
  }
};