import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { connection } from "../models/index.js"


export async function updatePost(req, res){
    
    try {
        const token = res.locals.token
        const post = res.locals.post
        const id = res.locals.id
        
        const users = await connection.query(`SELECT * FROM users WHERE password = $1;`, [token])
        
        if (users.rowCount > 0) {
            const hashtags = post.content.split(' ').filter(v=> v.startsWith('#'))
            const content = post.content.split('#').shift();
            await connection.query(`UPDATE posts (description, link) VALUES ($1, $2) WHERE id = $3;`, [content, post.link, id])

            await connection.query(`DELETE FROM hashtags WHERE "postId" = $1`, [id])

            let tempHashTag = ""
            for (let i = 0; i<hashtags.length; i++){
                tempHashTag = hashtags[i]
                await connection.query(`INSERT INTO hashtags ("postId", "hashtagName") VALUES ($1, $2);`, [id, tempHashTag])
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