import joi from "joi"

export const PostSchema = joi.object({
    content: joi.string().required(),
    link: joi.string().uri().max(250).required()
  })