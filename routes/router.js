const express = require("express");
const userRouter = require("./userRouter");
const medicamentosRouter = require("./medicamentosRouter");
const listaMedicamentosRouter = require("./listaMedicamentosRouter");
const listaHorarioRouter = require("./listaHorarioRouter");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("OK");
});

router.use("/user", userRouter);
router.use("/medicamentos", medicamentosRouter);
router.use("/listaMedicamentos", listaMedicamentosRouter);
router.use("/listaHorario", listaHorarioRouter);

module.exports = router; 