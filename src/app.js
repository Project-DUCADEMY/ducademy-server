import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import nodemailer from 'nodemailer'
import mainRouter from './routers/mainRouter'
import infoRouter from './routers/infoRouter'
import db from './db'
import WorkBook from './models/WorkBook'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: {},
  })
)
app.use('/authenticate', mainRouter)

app.use('/', infoRouter)


export default app
