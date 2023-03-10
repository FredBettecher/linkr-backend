import connection from "../models/index.js";

async function postLikes(req, res) {
    return connection.query('INSERT INTO likes ("postId", "userId") VALUES ($1, $2)', [postId, userId]);
}

async function postDislikes(req, res) {
    return await connection.query('DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2', [postId, userId]);
}

export { postLikes, postDislikes };