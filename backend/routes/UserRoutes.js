import express from "express";
import * as userController from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/", userController.findAll);
router.get("/:id", userController.findById);
router.post("/", AuthMiddleware, userController.create);
router.put("/:id",AuthMiddleware, userController.update);
router.delete("/:id", AuthMiddleware, userController.deleteOne);

export default router;
