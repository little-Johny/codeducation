'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const userLikes = [
      // Carlos López (estudiante) - likes a lecciones
      {
        id: '550e8400-e29b-41d4-a716-446655440061',
        userId: '550e8400-e29b-41d4-a716-446655440004',
        lessonId: '550e8400-e29b-41d4-a716-446655440021',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440062',
        userId: '550e8400-e29b-41d4-a716-446655440004',
        lessonId: '550e8400-e29b-41d4-a716-446655440022',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440063',
        userId: '550e8400-e29b-41d4-a716-446655440004',
        lessonId: '550e8400-e29b-41d4-a716-446655440024',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Ana Martínez (estudiante) - likes a lecciones
      {
        id: '550e8400-e29b-41d4-a716-446655440064',
        userId: '550e8400-e29b-41d4-a716-446655440005',
        lessonId: '550e8400-e29b-41d4-a716-446655440027',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440065',
        userId: '550e8400-e29b-41d4-a716-446655440005',
        lessonId: '550e8400-e29b-41d4-a716-446655440028',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440066',
        userId: '550e8400-e29b-41d4-a716-446655440005',
        lessonId: '550e8400-e29b-41d4-a716-446655440029',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Pedro Rodríguez (estudiante) - likes a lecciones
      {
        id: '550e8400-e29b-41d4-a716-446655440067',
        userId: '550e8400-e29b-41d4-a716-446655440006',
        lessonId: '550e8400-e29b-41d4-a716-446655440021',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440068',
        userId: '550e8400-e29b-41d4-a716-446655440006',
        lessonId: '550e8400-e29b-41d4-a716-446655440023',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Laura Fernández (estudiante) - likes a lecciones
      {
        id: '550e8400-e29b-41d4-a716-446655440069',
        userId: '550e8400-e29b-41d4-a716-446655440008',
        lessonId: '550e8400-e29b-41d4-a716-446655440024',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440070',
        userId: '550e8400-e29b-41d4-a716-446655440008',
        lessonId: '550e8400-e29b-41d4-a716-446655440025',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440071',
        userId: '550e8400-e29b-41d4-a716-446655440008',
        lessonId: '550e8400-e29b-41d4-a716-446655440026',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Miguel Torres (estudiante) - likes a lecciones
      {
        id: '550e8400-e29b-41d4-a716-446655440072',
        userId: '550e8400-e29b-41d4-a716-446655440009',
        lessonId: '550e8400-e29b-41d4-a716-446655440027',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440073',
        userId: '550e8400-e29b-41d4-a716-446655440009',
        lessonId: '550e8400-e29b-41d4-a716-446655440029',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440074',
        userId: '550e8400-e29b-41d4-a716-446655440009',
        lessonId: '550e8400-e29b-41d4-a716-446655440030',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('user_likes', userLikes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_likes', null, {});
  }
};