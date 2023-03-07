import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import joi from "joi"
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from 'uuid' 
import router from "./routes/index.js"

const server = express()
dotenv.config()
server.use(cors())
server.use(express.json())
server.use(router)

const { PORT } = process.env
server.listen(PORT, () => {
  console.log("server running on PORT " + PORT)
})