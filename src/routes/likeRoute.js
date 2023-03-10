import { Router } from "express";
import { like, dislike, getPostLikes, resultLikes } from "../controllers/likeController.js";

const likeRoute = Router();

likeRoute.post("/like", like);
likeRoute.delete("/dislike/:postId", dislike);
likeRoute.get("/likes", getPostLikes);
likeRoute.get("/isliked", resultLikes);

export default likeRoute;