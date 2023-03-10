import { Router } from "express";
import { like, dislike, getLikes} from "../controllers/likeController.js";

const likeRoute = Router();

likeRoute.post("/like/:postId", like);
likeRoute.post("/dislike/:postId", dislike);
likeRoute.get("/likes/:postId", getLikes);

//falta autenticações!!!

export default likeRoute;