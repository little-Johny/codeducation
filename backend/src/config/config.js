require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  db: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  jwtSecret: process.env.JWT_SECRET
};

module.exports = { config };