const express = require("express");

const tracuuController = require("../controllers/tracuuController");

const tracuuRouter = express.Router();


tracuuRouter.post("/thunhapthang", tracuuController.tracuuthunhapthang);
tracuuRouter.post("/thuetncn", tracuuController.tracuuthueTNCN);
tracuuRouter.post("/contact", tracuuController.contact);

tracuuRouter.post("/employees", tracuuController.getEmployees);
tracuuRouter.post("/employees/create", tracuuController.createEmployees);
tracuuRouter.get("/employees/:id", tracuuController.getEmployeesById);
tracuuRouter.post("/employees/update/:id", tracuuController.updateEmployees);

module.exports = tracuuRouter;
