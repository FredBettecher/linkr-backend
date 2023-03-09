import { Router } from "express"
import { authRoute } from "./authRoute.js"
import { usersRoute } from "./usersRoute.js"

const router = Router();
router.use(authRoute, usersRoute);

export default router;