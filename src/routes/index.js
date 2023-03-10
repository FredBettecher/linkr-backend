import { Router } from "express"
import { authRoute } from "./authRoute.js"
import { usersRoute } from "./usersRoute.js"
import { timeLineRoute } from "./timeline.js"
import { createPostRoute } from "./createPost.js"

const router = Router()
router.use([authRoute, usersRoute, timeLineRoute, createPostRoute])

export default router
