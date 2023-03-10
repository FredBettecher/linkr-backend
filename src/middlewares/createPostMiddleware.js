import { PostSchema } from "../models/postModel.js";
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export async function checkPost(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1];
    const post = req.body.post
    
    const {error} = PostSchema.validate(post, { abortEarly: false })
    try {
      if (error){
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY)
      }
  
      if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
      }
    }
    catch (error) {
      console.error(error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
    res.locals.post = post
    res.locals.token = token
    next()
  
  }
