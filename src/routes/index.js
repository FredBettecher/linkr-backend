import { Router } from "express"
import { authRoute } from "./authRoute.js"
import { timeLineRoute } from "./timeline.js"

const router = Router()
router.use([authRoute, timeLineRoute])

export default router