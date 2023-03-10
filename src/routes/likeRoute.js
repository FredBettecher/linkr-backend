import { Router } from "express";
import { like, dislike } from "../controllers/likeController.js";

const likeRoute = Router();

likeRouter.post("/like", like);
likeRouter.delete("/dislike/:postId", dislike);

export default likeRoute;