import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { connection } from "../models/index.js"


export async function createpost(req, res){
    
    try {
        const token = res.locals.token
        const post = hashtag.locals.post
        
        const users = await connection.query(`SELECT * FROM users WHERE password = $1;`, [token])
        
        if (users.rowCount > 0) {
            const hashtags = post.content.split(' ').filter(v=> v.startsWith('#'))
            const content = post.content.split('#').shift();
            await connection.query(`INSERT INTO posts (description, link) VALUES ($1, $2);`, [content, post.link])

            const postId = await connection.query(`SELECT SCOPE_IDENTITY();`) //pega o id do ultimo post inserido

            const tempHashTag = ""
            for (let i = 0; i<hashtags.length; i++){
                tempHashTag = hashtags[i]
                await connection.query(`INSERT INTO hashtags ("postId", "hashtagName") VALUES ($1, $2);`, [postId, tempHashTag])
            }
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