import joi from "joi"
import { connection } from "./index.js"
import { queries } from "../repositorys/index.js"

export const emailExists = async (email) => {
  const { rows: user } = await connection.query(queries.getEmailByEmail(), [
    email,
  ])
  if (user && user.length !== 0) return true
  return false
}

export const insertUser = async (user) => {
  const { username, email, password,  pictureUrl} = user
  await connection.query(queries.insertInUsers(), [username, email, password, pictureUrl])
}

export const getPasswordEmail = async (email) => {
  const { rows: passwordCrypt } = await connection.query(
    queries.getPasswordByEmail(),
    [email]
  )
  return passwordCrypt[0]?.password
}

export const getUserByEmail = async (email) => {
  const { rows: user } = await connection.query(queries.getUserByEmail(), [
    email,
  ])
  return user[0]
}

export const signupSchema = joi.object({
  username: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().required(),
  pictureUrl: joi.string().uri().required(),
})

export const signinSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().required(),
})