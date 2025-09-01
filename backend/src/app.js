const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Servidor corriendo 🚀" });
});

module.exports = app;
