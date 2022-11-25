import express from 'express'
import mainRouter from './routers/mainRouter'
import infoRouter from './routers/infoRouter'
import path from 'path'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'public/'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser('1234'))

app.use('/user', mainRouter)

app.use('/kiosk', infoRouter)

export default app
