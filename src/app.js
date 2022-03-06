import express from "express"
import session from "express-session"
import MongoStore from "connect-mongo"
import globalRouter from "./routers/globalRouter"
import { localsMiddlewares } from "./middlewares"

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

// app.use(localsMiddlewares)
app.use("/authenticate", globalRouter)

app.get("/test", (req, res) => {
  res.send("testing")
})

export default app
