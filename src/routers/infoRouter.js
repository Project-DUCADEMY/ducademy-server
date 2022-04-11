import express from 'express'
import { userinfo } from '../controllers/userControllers'
import {
  QuestionCreation,
  pullQuestion,
  oneQuestion,
  deleteQuestion,
  updateQuestion,
} from '../controllers/QuestionControllers'
import { protectedMiddleware } from '../middlewares'

const infoRouter = express.Router()

infoRouter.post('/user/userinfo', userinfo)

infoRouter.post('/problem/register', protectedMiddleware, QuestionCreation)

infoRouter.get('/problem/problems', pullQuestion)

infoRouter.get('/problem/problem/', oneQuestion)

infoRouter.delete('/problem/delete/', deleteQuestion)

infoRouter.put('/problem/change', updateQuestion)

export default infoRouter
