import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { connection } from "../models/index.js"
import joi from "joi"

export const postIdSchema = joi.object({
    postId: joi.number().required()
  })

export async function deletePost(req, res){
    
    try {
        const token = res.locals.token
        const postId = req.body.postId

        const {error} = postIdSchema.validate({postId: postId}, { abortEarly: false })
        
        const users = await connection.query(`SELECT * FROM users WHERE password = $1;`, [token])

        if(error){
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY)
        }
        
        else if (users.rowCount > 0) {
            await connection.query(`DELETE FROM hashtags WHERE "postId" = $1`, [postId])
            await connection.query(`DELETE FROM posts WHERE "id" = $1`, [postId])            
        }
        else {
            return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
        }
    
        
      }
      catch (error) {
        console.error(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
      }

}