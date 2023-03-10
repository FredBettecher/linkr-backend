import { Router } from "express"
import { checkUpdatePost } from "../middlewares/updatePostMiddleware.js"
import { updatePost } from "../controllers/updatePostController.js"

export const updatePostRoute = Router()

updatePostRoute.post("/updatepost", checkUpdatePost, updatePost)