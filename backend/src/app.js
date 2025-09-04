const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
require("dotenv").config();

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/errorHandler");
const responseHandler = require("./middlewares/responseHandler");
const routes = require("./routes");

// ejecutar passport config
require("./config/passport")(passport);

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());

// Response handler
app.use(responseHandler);

// Rutas
routes(app);

// Middlewares de error
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

module.exports = app;
