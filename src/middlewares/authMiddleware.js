import { stripHtml } from "string-strip-html"
import bcrypt from "bcrypt"
import { authModel } from "../models/index.js"
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export const checkEmail = async (request, response, next) => {
  const { email } = response.locals.newUser
  
  const emailExists = await authModel.emailExists(email)
  if (emailExists) return response.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT)
  next()
  return true
}

export const validateSignUp = (request, response, next) => {
  const Body = authModel.signupSchema.validate(request.body)

  if (Body.error) return response.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY)
  
  const newUser = {
    username: stripHtml(Body.value.username).result,
    email: stripHtml(Body.value.email).result,
    password: Body.value.password,
    pictureUrl: Body.value.pictureUrl,
    createdAt: Body.value.createdAt,
  }

  const validateBody = authModel.signupSchema.validate(newUser)
  if (validateBody.error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY)
  }

  response.locals.newUser = newUser
  next()
  return true
}

export const validateSignIn = (request, response, next) => {
  const Body = authModel.signinSchema.validate(request.body)

  if (Body.error) return response.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY)
 
  const user = {
    email: Body.value.email,
    password: Body.value.password,
  }

  response.locals.user = user
  next()
  return true
}

export const checkPassword = async (request, response, next) => {
  const { email, password } = response.locals.user
  const passwordCrypt = await authModel.getPasswordEmail(email)
  if (!passwordCrypt) return response.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
  
  const IsValid = bcrypt.compareSync(password, passwordCrypt)
  if (!IsValid) return response.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
  next()
  return true
}