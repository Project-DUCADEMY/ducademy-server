import express from 'express'
import { userinfo } from '../controllers/userControllers'
import {
  QuestionCreation,
  pullQuestion,
  oneQuestion,
} from '../controllers/QuestionControllers'
import { protectedMiddleware } from '../middlewares'

const infoRouter = express.Router()

infoRouter.post('/user/userinfo', userinfo)

infoRouter.post('/problem/register', protectedMiddleware, QuestionCreation)

infoRouter.get('/problem/problems', pullQuestion)

infoRouter.get('/problem/problem/', oneQuestion)

export default infoRouter
