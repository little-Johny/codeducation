const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/errorHandler");
const responseHandler = require("./middlewares/responseHandler");
const routes = require("./routes");

// ejecutar passport config
require("./config/passport")(passport);

const app = express();

// Middlewares globales
app.use(
    cors({
        origin: true, // Permitir cualquier origen en desarrollo
        credentials: true,
    })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(
    "/files",
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Cross-Origin-Resource-Policy", "cross-origin");
        next();
    },
    express.static(path.join(__dirname, "../uploads"))
);

// Response handler
app.use(responseHandler);

// Rutas
routes(app);

// Middlewares de error
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
