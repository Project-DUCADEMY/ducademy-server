import login from './router/login-signup.js'
import express from 'express'
const app = express()

app.use('/login', login)

app.listen(3000, () => {
    console.log('server running...')
})