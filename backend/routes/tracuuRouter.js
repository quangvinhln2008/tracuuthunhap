const express = require("express");

const tracuuController = require("../controllers/tracuuController");

const tracuuRouter = express.Router();


tracuuRouter.post("/thunhapthang", tracuuController.tracuuthunhapthang);
tracuuRouter.post("/thuetncn", tracuuController.tracuuthueTNCN);
tracuuRouter.post("/contact", tracuuController.contact);

tracuuRouter.post("/employees", tracuuController.getEmployees);
tracuuRouter.post("/employees/create", tracuuController.createEmployees);

module.exports = tracuuRouter;
