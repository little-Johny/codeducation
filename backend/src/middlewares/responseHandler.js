function responseHandler(req, res, next) {
  res.success = (data, message = "Operacion exitosa", statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  };

  res.error = (
    message = "Internal Server Error",
    statusCode = 500,
    data = null
  ) => {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      data,
    });
  };

  next();
}

module.exports = responseHandler;
