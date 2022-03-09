import express from "express"
import { join, login, logout } from "../controllers/userControllers"

const globalRouter = express.Router()

globalRouter.post("/join", join)

globalRouter.post("/login", login)

globalRouter.post("/logout", logout)

export default globalRouter
