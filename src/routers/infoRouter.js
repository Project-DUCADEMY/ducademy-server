import express from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/public/image')
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
})
const upload = multer({ storage: storage })

import {
  admin,
  main,
  choice,
  registration,
  productRegistration,
  deleteOne,
  updatePage,
  updateOne
} from '../controllers/kioskController'

const infoRouter = express.Router()

infoRouter.get('/', main)

infoRouter.get('/admin', admin)

infoRouter.get('/choice/:id', choice )

infoRouter.get('/registration', registration)
infoRouter.post('/registration', upload.single('img'), productRegistration)

infoRouter.get('/delete/:id', deleteOne)

infoRouter.get('/update/:id', updatePage)
infoRouter.post('/update/:id', upload.single('img'), updateOne)



export default infoRouter
