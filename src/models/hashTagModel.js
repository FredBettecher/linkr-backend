import joi from "joi"

export const hashTagSchema = joi.object({
    hashtag: joi.string().required()
  })