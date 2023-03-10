import { Router } from "express"
import { checkToken } from '../middlewares/authMiddleware.js';
import { timeline } from "../controllers/timeLineController.js";

export const timeLineRoute = Router()

timeLineRoute.get("/timeline", checkToken, timeline)