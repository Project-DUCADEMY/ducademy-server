import express from 'express'
import { join, login, joinPage, loginPage } from '../controllers/userController'

const mainRouter = express.Router()

mainRouter.get('/join', joinPage)
mainRouter.post('/join', join)

mainRouter.get('/login', loginPage)
mainRouter.post('/login', login)

export default mainRouter
