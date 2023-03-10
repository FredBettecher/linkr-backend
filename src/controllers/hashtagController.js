import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { connection } from "../models/index.js"


export async function hashtag(req, res){
    
    try {
        const token = res.locals.token
        const hashtag = res.locals.hashtag
        
        const users = await connection.query(`SELECT * FROM users WHERE password = $1;`, [token])

        if (users.rowCount > 0) {
            const posts = await connection.query(`SELECT * FROM posts JOIN hashtags ON ( posts.id = hashtags."postId" ) WHERE hashtags."hashtagName" = $1;`, [hashtag])
            return res.status(200).send(posts.rows)
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