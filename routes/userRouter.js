const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares​/auth");

userRouter.post("/authentication", userController.authentication);
userRouter.get("/listAllUsers", userController.listAllUsers);
userRouter.post("/newUser", userController.newUser);
userRouter.delete("/deleteUser/:email", auth, userController.deleteUser);
userRouter.put("/updateUser/", auth, userController.updateUser);

module.exports = userRouter;