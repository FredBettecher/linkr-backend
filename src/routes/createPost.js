import { Router } from "express"
import { checkPost } from "../middlewares/createPostMiddleware.js"
import { createpost } from "../controllers/createPostController.js"

export const createPostRoute = Router()

createPostRoute.post("/createpost", checkPost, createpost)