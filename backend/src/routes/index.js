const express = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const courseRouter = require("./course.router");
const lessonRouter = require("./lesson.router");
const fileRouter = require("./file.router");
const userFavoriteRouter = require("./userFavorites.router");
const userLikesRouter = require("./userLikes.router");

function routes(app) {
  const router = express.Router();

  app.use("/api", router);

  router.get("/", (req, res) => {
    res.json({ ok: true, message: "Servidor corriendo 🚀" });
  });

  router.use("/auth", authRouter);
  router.use("/users", userRouter);
  router.use("/courses", courseRouter);
  router.use("/lessons", lessonRouter);
  router.use("/files", fileRouter);
  router.use("/favorites", userFavoriteRouter);
  router.use("/likes", userLikesRouter);
}

module.exports = routes;
