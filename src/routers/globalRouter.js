import express from "express"
import { join, login } from "../controllers/userControllers"

const globalRouter = express.Router()

globalRouter.post("/join", join)

globalRouter.post("/login", login)

export default globalRouter
