import express from 'express'
import { userinfo } from '../controllers/userControllers'
import {
  QuestionCreation,
  pullQuestion,
  oneQuestion,
  deleteQuestion,
  updateQuestion,
} from '../controllers/QuestionControllers'
import { workBookCreation } from '../controllers/workBook'
import { protectedMiddleware } from '../middlewares'
import {
  changeMemo,
  deleteMemo,
  listMemo,
  MemoCreation,
} from '../controllers/MemoController'

const infoRouter = express.Router()

// userinfo part
infoRouter.post('/user/userinfo', userinfo)

// problem part
infoRouter.post('/problem/register', protectedMiddleware, QuestionCreation)
infoRouter.get('/problem/problems', pullQuestion)
infoRouter.get('/problem/problem/', oneQuestion)
infoRouter.delete('/problem/delete/', deleteQuestion)
infoRouter.put('/problem/change', updateQuestion)

// memo part
infoRouter.post('/memo/create', protectedMiddleware, MemoCreation)
infoRouter.get('/memo/list', protectedMiddleware, listMemo)
infoRouter.put('/memo/change', protectedMiddleware, changeMemo)
infoRouter.delete('/memo/delete', protectedMiddleware, deleteMemo)

// workbook part
infoRouter.post('/workbook/create', protectedMiddleware, workBookCreation)

export default infoRouter
