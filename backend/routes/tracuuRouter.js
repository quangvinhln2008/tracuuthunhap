const express = require("express");

const tracuuController = require("../controllers/tracuuController");

const tracuuRouter = express.Router();


tracuuRouter.post("/thunhapthang", tracuuController.tracuuthunhapthang);
tracuuRouter.post("/thuetncn", tracuuController.tracuuthunhapthang);
tracuuRouter.post("/contact", tracuuController.contact);

module.exports = tracuuRouter;
