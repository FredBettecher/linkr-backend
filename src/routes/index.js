import { Router } from "express"
import { authRoute } from "./authRoute.js"
import { usersRoute } from "./usersRoute.js"
import likeRoute from "./likeRoute.js";

const router = Router();
router.use(authRoute, usersRoute);
router.use(likeRoute);

export default router;