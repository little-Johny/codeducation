const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')


const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Servidor corriendo 🚀" });
});

module.exports = app;
