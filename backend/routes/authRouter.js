const express = require("express");

const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

authRouter.post("/login", authController.signin);

module.exports = authRouter;
