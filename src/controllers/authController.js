import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { authModel } from "../models/index.js"

dotenv.config()
const EXPIRE_TIME = 60 * 60 * 24 // *1 DAY
const jwtExpire = {expiresIn: EXPIRE_TIME,}

export const signUp = async (request, response) => {
  const { name, email, password } = response.locals.newUser
  const passwordCrypt = bcrypt.hashSync(password, 12)
  const user = {
    name,
    email,
    password: passwordCrypt,
  }

  try {
    await authModel.insertUser(user)
    response.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED)
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  }
}

export const signIn = async (request, response) => {
  const { email } = response.locals.user
  try {
    const user = await authModel.getUserByEmail(email)
    const { id: userId } = user
    const data = { userId }
    const token = jwt.sign(data, jwtExpire)
    response.status(StatusCodes.OK).send(token)
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  }
}