import connection from "../models/index.js";

async function postLikes(req, res) {
    return connection.query(`INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`, [postId, userId]);
}

async function postDislikes(req, res) {
    return connection.query(`DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2`, [postId, userId]);
}

async function getLikes(){
    return connection.query(`SELECT FROM likes users.name, users.id 
        FROM likes JOIN users ON users.id = likes.userId 
        WHERE likes.postId = $2 AND user.id != $1`, [userId, postId]);
}

async function countLikes(){
    const result = await connection.query('SELECT * FROM likes WHERE "userId" = $1 AND "postId" = $2', [userId, postId]);

    return result.rowCount;
}

export { postLikes, postDislikes, getLikes, countLikes};