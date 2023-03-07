import { userModel } from "../models/index.js"
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