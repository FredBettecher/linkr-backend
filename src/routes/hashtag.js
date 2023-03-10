import { Router } from "express"
import { checkHashTag } from "../middlewares/hashtagMiddleware.js"
import { hashtag } from "../controllers/hashtagController.js"

export const hashtagRoute = Router()

hashtagRoute.get("/hashtag/:hashtag", checkHashTag, hashtag)