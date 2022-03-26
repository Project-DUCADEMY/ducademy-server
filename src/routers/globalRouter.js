import express from "express"
import { join, login, logout } from "../controllers/userControllers"
import { QuestionCreation } from "../controllers/QuestionControllers"

const globalRouter = express.Router()

globalRouter.post("/join", join)

globalRouter.post("/login", login)

globalRouter.post("/logout", logout)

globalRouter.post("/problem/register", QuestionCreation)

export default globalRouter
