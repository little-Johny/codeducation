require("dotenv").config();
const { sequelize } = require("../../db/models");
const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin Principal',
    email: 'admin@codeducation.com',
    password: '123456',
    role: 'admin',
    theme: false
  },
  {
    name: 'Profesor Juan Pérez',
    email: 'juan.perez@codeducation.com',
    password: '123456',
    role: 'teacher',
    theme: false
  },
  {
    name: 'Profesora María García',
    email: 'maria.garcia@codeducation.com',
    password: '123456',
    role: 'teacher',
    theme: true
  },
  {
    name: 'Estudiante Carlos López',
    email: 'carlos.lopez@codeducation.com',
    password: '123456',
    role: 'student',
    theme: false
  },
  {
    name: 'Estudiante Ana Martínez',
    email: 'ana.martinez@codeducation.com',
    password: '123456',
    role: 'student',
    theme: true
  },
  {
    name: 'Estudiante Pedro Rodríguez',
    email: 'pedro.rodriguez@codeducation.com',
    password: '123456',
    role: 'student',
    theme: false
  },
  {
    name: 'Profesor Roberto Silva',
    email: 'roberto.silva@codeducation.com',
    password: '123456',
    role: 'teacher',
    theme: false
  },
  {
    name: 'Estudiante Laura Fernández',
    email: 'laura.fernandez@codeducation.com',
    password: '123456',
    role: 'student',
    theme: true
  },
  {
    name: 'Estudiante Miguel Torres',
    email: 'miguel.torres@codeducation.com',
    password: '123456',
    role: 'student',
    theme: false
  },
  {
    name: 'Profesora Carmen Ruiz',
    email: 'carmen.ruiz@codeducation.com',
    password: '123456',
    role: 'teacher',
    theme: true
  }
];

(async () => {
  try {
    console.log('🔌 Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a la base de datos');

    console.log('🌱 Iniciando seeder de usuarios...');
    
    // Importar el modelo User después de la conexión
    const { User } = require("../../db/models");
    
    // Limpiar usuarios existentes (opcional)
    const clearExisting = process.argv.includes('--clear');
    if (clearExisting) {
      console.log('🗑️  Limpiando usuarios existentes...');
      await User.destroy({ where: {}, force: true });
    }

    let createdCount = 0;
    let skippedCount = 0;

    for (const userData of users) {
      try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email: userData.email } });
        
        if (existingUser) {
          console.log(`⏭️  Usuario ya existe: ${userData.email}`);
          skippedCount++;
          continue;
        }

        // Crear el usuario
        const user = await User.create(userData);
        console.log(`✅ Usuario creado: ${user.name} (${user.email}) - Rol: ${user.role}`);
        createdCount++;
        
      } catch (error) {
        console.error(`❌ Error creando usuario ${userData.email}:`, error.message);
      }
    }

    console.log('\n📊 Resumen del seeder:');
    console.log(`   ✅ Usuarios creados: ${createdCount}`);
    console.log(`   ⏭️  Usuarios omitidos: ${skippedCount}`);
    console.log(`   📝 Total procesados: ${users.length}`);
    
    console.log('\n🎉 Seeder completado exitosamente');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error en el seeder:', error);
    process.exit(1);
  }
})();