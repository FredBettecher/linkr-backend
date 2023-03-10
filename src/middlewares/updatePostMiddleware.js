import { PostSchema } from "../models/postModel.js";
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import joi from "joi"

export const postIdSchema = joi.object({
    postId: joi.number().required()
  })

export async function checkUpdatePost(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1];
    const id = req.body.id
    const post = {
        content: req.body.content,
        link: req.body.link
      }
    
    const {error} = PostSchema.validate(post, { abortEarly: false })
    const {errorId} = postIdSchema.validate({postId: id}, { abortEarly: false })
    try {
      if (error){
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY)
      } else if (errorId){
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY)
      } else if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
      }
    }
    catch (error) {
      console.error(error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
    res.locals.id = id
    res.locals.post = post
    res.locals.token = token
    next()
  
  }