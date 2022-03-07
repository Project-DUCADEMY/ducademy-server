import express from "express"
import { userinfo } from "../controllers/userControllers"

const userInfoRouter = express.Router()

userInfoRouter.post("/user/userinfo", userinfo)

export default userInfoRouter
