import { Router } from "express"
import { authRoute } from "./authRoute.js"
import { timeLineRoute } from "./timeline.js"
import { createPostRoute } from "./createPost.js"

const router = Router()
router.use([authRoute, timeLineRoute, createPostRoute])

export default router