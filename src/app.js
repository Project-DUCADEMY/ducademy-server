import express from "express"
import session from "express-session"
import MongoStore from "connect-mongo"
import globalRouter from "./routers/globalRouter"
import { localsMiddlewares } from "./middlewares"
import userInfoRouter from "./routers/userInfoRouter"
import path from 'path';
const __dirname = path.resolve();


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
)

app.use ( express.static( './../ducademy-front/build/' ))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../ducademy-front/build/index.html'))
})

// app.use(localsMiddlewares)
app.use("/authenticate", globalRouter)

app.use("/", userInfoRouter)

export default app
