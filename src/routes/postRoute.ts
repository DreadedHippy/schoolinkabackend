import { Router  } from "express";
import * as PostController from "../controllers/postController";
import { validateId } from "../middleware/paramsValidator";
import { postValidator } from "../middleware/postValidator";
let router = Router();

router.get("/", PostController.getAllPosts);
router.get("/:id", validateId, PostController.getSpecificPost);
router.post("/new", postValidator, PostController.createPost);
router.patch("/:id", validateId, PostController.editPost);
router.delete("/:id", validateId, PostController.deletePost);

export default router;