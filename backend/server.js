const app = require('./src/app');
const PORT = process.env.PORT;

(async () => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en  http://localhost:${PORT}/api`);
  });
})();
