const { Sequelize } = require('sequelize');
const { config } = require('./config');

// proteger password por si tiene caracteres especiales
const password = encodeURIComponent(config.db.password);

const URI = `${config.db.dialect}://${config.db.user}:${password}@${config.db.host}:${config.db.port}/${config.db.name}`;

const sequelize = new Sequelize(URI, {
  dialect: config.db.dialect,
  logging: (msg) => console.log(`[Sequelize]: ${msg}`),
});

// testear conexión
sequelize.authenticate()
  .then(() => console.log('✅ Conectado a la base de datos'))
  .catch(err => console.error('❌ Error de conexión:', err));

module.exports = sequelize;
