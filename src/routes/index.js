import { Router } from "express"
import { authRoute } from "./authRoute.js"
import { usersRoute } from "./usersRoute.js"
import { timeLineRoute } from "./timeline.js"
import { createPostRoute } from "./createPost.js"
import { hashtagRoute } from "./hashtag.js"
import likeRoute from "./likeRoute.js"

const router = Router()
router.use([authRoute, usersRoute, timeLineRoute, createPostRoute, hashtagRoute])
router.use(likeRoute);

export default router