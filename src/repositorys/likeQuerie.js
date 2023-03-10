import connection from "../models/index.js";

async function postLikes(req, res) {
    return connection.query('INSERT INTO likes ("postId", "userId") VALUES ($1, $2)', [postId, userId]);
}

async function postDislikes(req, res) {
    return connection.query('DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2', [postId, userId]);
}

async function getLikes(){
    return connection.query('SELECT FROM likes users.name, users.id FROM likes JOIN users ON users.id = likes.userId WHERE likes.postId = $2 AND user.id != $1 LIMIT 2', [userId, postId]);
}

export { postLikes, postDislikes, getLikes };