import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import nodemailer from 'nodemailer'
import mainRouter from './routers/mainRouter'
import infoRouter from './routers/infoRouter'
import db from './db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: {
      maxAge: 1000000,
    },
  })
)
app.use('/authenticate', mainRouter)

app.use('/', infoRouter)

// app.use ( express.static( './../ducademy-front/build/' ))
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../ducademy-front/build/index.html'))
// })

// app.use(localsMiddlewares)

// app.post("/test", async (req, res) => {
//   const { email, emailCh } = req.body
//   const emailCh1 = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000

//   let emailHandller = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.NODEMAILER_USER,
//       pass: process.env.NODEMAILER_PASS,
//     },
//   })

//   let info = await emailHandller.sendMail({
//     from: `두카데미 Team <${process.env.NODEMAILER_USER}>`,
//     to: email,
//     subject: "야스가 좋아",
//     text: `혹시 개종박씨 맞습니까? 씹련아 코드다 : ${emailCh1}`,
//   })

//   res.send("hi")
// })

export default app
