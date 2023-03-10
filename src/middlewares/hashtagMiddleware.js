import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { hashTagSchema } from '../models/hashTagModel.js'

export async function checkHashTag(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1];
    const hashtag = req.params.hashtag
    
    const {error} = hashTagSchema.validate({hashtag: hashtag}, { abortEarly: false })
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
    res.locals.hashtag = hashtag
    res.locals.token = token
    next()
  
  }