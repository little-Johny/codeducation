const boom = require("@hapi/boom");

function logErrors(err, req, res, next) {
  console.log(`LogError`);
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log(`Errorhandler`);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });

  next(err);
}

function boomErrorHandler(err, req, res, next) {
  // Si el error ya es Boom
  if (boom.isBoom(err)) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }

  // Si no es Boom, lo convertimos en un 500 genérico
  console.error(err); // para debugging
  return res.status(500).json({
    statusCode: 500,
    error: "Internal Server Error",
    message: err.message || "Something went wrong",
  });
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
