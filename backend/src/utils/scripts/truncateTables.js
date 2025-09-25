require("dotenv").config();
const { sequelize } = require("../../db/models");

(async () => {
  try {
    console.log('🔌 Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a la base de datos');

    console.log('🗑️  Iniciando truncado de tablas...');

    // Importar los modelos después de la conexión
    const { Course } = require("../../db/models");

    // Truncar tabla courses primero (debido a referencias)
    console.log('🗑️  Truncando tabla courses...');
    await Course.destroy({ truncate: true });
    console.log('✅ Tabla courses truncada');


    console.log('\n🎉 Truncado completado exitosamente');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error en el truncado:', error);
    process.exit(1);
  }
})();