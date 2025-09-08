const express = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const courseRouter = require("./course.router");
const userFavoriteRouter = require("./userFavorites.router");

function routes(app) {
  const router = express.Router();

  app.use("/api", router);

  router.get("/", (req, res) => {
    res.json({ ok: true, message: "Servidor corriendo 🚀" });
  });

  router.use("/auth", authRouter);
  router.use("/users", userRouter);
  router.use("/courses", courseRouter);
  router.use("/favorites", userFavoriteRouter);
}

module.exports = routes;
