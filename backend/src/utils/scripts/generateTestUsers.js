require("dotenv").config();
const { sequelize } = require("../../db/models");
const bcrypt = require('bcryptjs');

// Generador de nombres y emails aleatorios
const firstNames = [
  'Alejandro', 'María', 'Carlos', 'Ana', 'Pedro', 'Laura', 'Miguel', 'Carmen',
  'Roberto', 'Isabel', 'Fernando', 'Patricia', 'Diego', 'Sofía', 'Andrés', 'Valentina',
  'Sebastián', 'Camila', 'Nicolás', 'Gabriela', 'Javier', 'Daniela', 'Ricardo', 'Natalia',
  'Gonzalo', 'Andrea', 'Felipe', 'Paula', 'Matías', 'Constanza', 'Ignacio', 'Francisca'
];

const lastNames = [
  'González', 'Rodríguez', 'Martínez', 'García', 'López', 'Hernández', 'Pérez', 'Sánchez',
  'Ramírez', 'Cruz', 'Flores', 'Morales', 'Gómez', 'Díaz', 'Reyes', 'Jiménez',
  'Torres', 'Ruiz', 'Vargas', 'Castillo', 'Romero', 'Herrera', 'Medina', 'Guerrero',
  'Moreno', 'Álvarez', 'Silva', 'Ramos', 'Mendoza', 'Castro', 'Ortega', 'Delgado'
];

const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];

function generateRandomUser() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  
  const roles = ['student', 'teacher'];
  const role = roles[Math.floor(Math.random() * roles.length)];
  
  return {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
    password: '123456',
    role: role,
    theme: Math.random() > 0.5
  };
}

(async () => {
  try {
    console.log('🔌 Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a la base de datos');

    const { User } = require("../../db/models");
    
    // Obtener el número de usuarios a generar desde los argumentos
    const userCount = parseInt(process.argv[2]) || 20;
    const clearExisting = process.argv.includes('--clear');
    
    if (clearExisting) {
      console.log('🗑️  Limpiando usuarios existentes...');
      await User.destroy({ where: {}, force: true });
    }

    console.log(`🌱 Generando ${userCount} usuarios de prueba...`);
    
    let createdCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < userCount; i++) {
      try {
        const userData = generateRandomUser();
        
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email: userData.email } });
        
        if (existingUser) {
          console.log(`⏭️  Usuario ya existe: ${userData.email}`);
          skippedCount++;
          i--; // Intentar de nuevo
          continue;
        }

        // Crear el usuario
        const user = await User.create(userData);
        console.log(`✅ Usuario ${i + 1}/${userCount}: ${user.name} (${user.email}) - Rol: ${user.role}`);
        createdCount++;
        
      } catch (error) {
        console.error(`❌ Error creando usuario:`, error.message);
        skippedCount++;
      }
    }

    console.log('\n📊 Resumen de la generación:');
    console.log(`   ✅ Usuarios creados: ${createdCount}`);
    console.log(`   ⏭️  Usuarios omitidos: ${skippedCount}`);
    console.log(`   📝 Total procesados: ${userCount}`);
    
    console.log('\n🎉 Generación de usuarios completada exitosamente');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error en la generación:', error);
    process.exit(1);
  }
})();