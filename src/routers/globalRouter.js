import express from "express"
import { join, login, userinfo } from "../controllers/userControllers"

const globalRouter = express.Router()

globalRouter.post("/join", join)

globalRouter.post("/login", login)

globalRouter.post("/user/userinfo", userinfo)

export default globalRouter
