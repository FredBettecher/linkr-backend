import { Router } from "express"
import { checkHashTag } from "../middlewares/hashtagMiddleware.js"

export const timeLineRoute = Router()

timeLineRoute.get("/hashtag/:hashtag", checkHashTag, timeline)