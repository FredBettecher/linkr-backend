import { Router } from "express"
import { checkToken } from "../middlewares/authMiddleware.js"
import { deletePost } from "../controllers/deletePostController.js"

export const deletePostRoute = Router()

deletePostRoute.post("/deletepost", checkToken, deletePost)