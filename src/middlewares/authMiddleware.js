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
    name: stripHtml(Body.value.name).result,
    email: stripHtml(Body.value.email).result,
    password: Body.value.password,
    confirmPassword: Body.value.confirmPassword,
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

export async function checkToken(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  try {
    

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
    }
  }
  catch (error) {
    console.error(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  }

  res.locals.token = token
  next()

}