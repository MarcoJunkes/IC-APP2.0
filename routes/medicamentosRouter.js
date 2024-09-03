const express = require("express");
const medicamentosRouter = express.Router();
const medicamentosController = require("../controllers/medicamentosController");
const auth = require("../middlewares​/auth");

medicamentosRouter.get("/listAll", auth, medicamentosController.listAll);
medicamentosRouter.post("/newMedicine", auth, medicamentosController.newMedicine);
medicamentosRouter.delete("/deleteMedicine/:id", auth, medicamentosController.deleteMedicine);
medicamentosRouter.put("/updateMedicine/:id", auth, medicamentosController.updateMedicine);
medicamentosRouter.post("/listaMedicamentos", auth, medicamentosController.listaMedicamentos);

module.exports = medicamentosRouter;