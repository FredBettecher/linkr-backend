import { Router } from "express"
import { authRoute } from "./authRoute.js"
import { usersRoute } from "./usersRoute.js"
import { timeLineRoute } from "./timeline.js"
import { createPostRoute } from "./createPost.js"
import { hashtagRoute } from "./hashtag.js"
import { deletePostRoute } from "./deletePost.js"
import { updatePostRoute } from "./updatePost.js"

const router = Router()
router.use([authRoute, usersRoute, timeLineRoute, createPostRoute, hashtagRoute, deletePostRoute, updatePostRoute])

export default router
