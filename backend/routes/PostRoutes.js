import express from "express";
import * as postController from "../controllers/PostController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
 
const router = express.Router();


router.get("/", postController.findAll);
router.get("/published", postController.findAllPublished);
router.get("/:id", postController.findOne);
router.post("/", AuthMiddleware, postController.create);
router.put("/:id", AuthMiddleware, postController.update);
router.delete("/:id", AuthMiddleware, postController.deleteOne);

export default router;