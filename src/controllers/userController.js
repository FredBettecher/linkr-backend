import { connection } from "../models/index.js"
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export const getUserLinks = async (request, response) => {
  const { id } = response.locals
  try {
    const data = await userModel.getUserUrlsById(id)
    response.status(StatusCodes.OK).send(data)
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  }
}

export const getUsers = async (req, res) => {
  try {
    const usersList = await connection.query(`SELECT * FROM users`);
    return res.status(200).send(usersList.rows);

  } catch(err) {
    return res.status(500).send(err.message);
  }
};

export const getAnotherUserPage = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await connection.query(`SELECT username, "pictureUrl" FROM users WHERE id = $1`, [id]);
    const anotherUsername = rows[0].username;
    const anotherUserPicture = rows[0].pictureUrl;
    const anotherUserPosts = await connection.query(`SELECT * FROM posts WHERE "userId" = $1`, [id]);

    const anotherUserPage = {
      username: anotherUsername,
      pictureUrl: anotherUserPicture,
      posts: anotherUserPosts.rows
    }
    
    return res.status(200).send(anotherUserPage);

  } catch(err) {
    return res.status(500).send(err.message);
  }
};