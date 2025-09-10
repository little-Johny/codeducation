'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const userFavorites = [
      // Carlos López (estudiante) - favoritos
      {
        id: '550e8400-e29b-41d4-a716-446655440041',
        userId: '550e8400-e29b-41d4-a716-446655440004',
        courseId: '550e8400-e29b-41d4-a716-446655440011',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440042',
        userId: '550e8400-e29b-41d4-a716-446655440004',
        courseId: '550e8400-e29b-41d4-a716-446655440012',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Ana Martínez (estudiante) - favoritos
      {
        id: '550e8400-e29b-41d4-a716-446655440043',
        userId: '550e8400-e29b-41d4-a716-446655440005',
        courseId: '550e8400-e29b-41d4-a716-446655440013',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440044',
        userId: '550e8400-e29b-41d4-a716-446655440005',
        courseId: '550e8400-e29b-41d4-a716-446655440014',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440045',
        userId: '550e8400-e29b-41d4-a716-446655440005',
        courseId: '550e8400-e29b-41d4-a716-446655440015',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Pedro Rodríguez (estudiante) - favoritos
      {
        id: '550e8400-e29b-41d4-a716-446655440046',
        userId: '550e8400-e29b-41d4-a716-446655440006',
        courseId: '550e8400-e29b-41d4-a716-446655440011',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440047',
        userId: '550e8400-e29b-41d4-a716-446655440006',
        courseId: '550e8400-e29b-41d4-a716-446655440016',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Laura Fernández (estudiante) - favoritos
      {
        id: '550e8400-e29b-41d4-a716-446655440048',
        userId: '550e8400-e29b-41d4-a716-446655440008',
        courseId: '550e8400-e29b-41d4-a716-446655440012',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440049',
        userId: '550e8400-e29b-41d4-a716-446655440008',
        courseId: '550e8400-e29b-41d4-a716-446655440015',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Miguel Torres (estudiante) - favoritos
      {
        id: '550e8400-e29b-41d4-a716-446655440050',
        userId: '550e8400-e29b-41d4-a716-446655440009',
        courseId: '550e8400-e29b-41d4-a716-446655440013',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440051',
        userId: '550e8400-e29b-41d4-a716-446655440009',
        courseId: '550e8400-e29b-41d4-a716-446655440014',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('user_favorites', userFavorites, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_favorites', null, {});
  }
};