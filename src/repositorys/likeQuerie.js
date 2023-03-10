import { connection } from "../models/index.js";

async function postLikes(postId, userId) {
    return connection.query(`
        INSERT INTO likes ("postId", "userId") 
        VALUES ($1, $2);`, [postId, userId]);
}

async function postDislikes(postId, userId) {
    return connection.query(`
        DELETE FROM likes 
        WHERE "postId" = $1 AND "userId" = $2;`, [postId, userId]);
}

async function usersLiked(postId, userId) {
    return connection.query(`
        SELECT users.name FROM likes 
        JOIN users ON likes.userId = users.id  
        WHERE likes.postId = $1 AND likes.userId = $2;`, [postId, userId]);
}

async function getLikesPost(postId, userId) {
    return connection.query(`
        SELECT users.name FROM likes 
        JOIN users ON users.id = likes.userId  
        WHERE likes.postId = $1 AND userId != $2
        ORDER BY likes.id DESC LIMIT 2;`, [postId, userId]);
}
async function countLikes(postId) {
    const likes = connection.query(`
        SELECT COUNT(*) FROM likes 
        WHERE "postId" = $1;`, [postId]);

    return likes.rows[0].count;
}

export { postLikes, postDislikes, usersLiked, getLikesPost, countLikes };