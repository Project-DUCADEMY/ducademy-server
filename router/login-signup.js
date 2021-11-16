import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
import mysql from 'mysql2'
import path from 'path'

const login = express.Router()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'ducami',
    password: 'Enzkal1234@',
    port: '3306',
    database: 'ducademy',
})
const route = path.join(process.cwd(), '..', 'view')

login.use(express.static('./view/ducademy-front/loginpage'))
login.use(express.json())
login.use(bodyParser.urlencoded({ extended: true }))


login.get('/', (req, res) => {
    fs.readFile('./view/ducademy-front/loginpage/ducami-login.html', (err, data) => {
        if (err) console.log(err)
        else res.send(data.toString())
    })
})

login.post('/', (req, res) => {
    let param = [req.body.join_name, req.body.join_email, req.body.join_birthday, req.body.join_password]
    console.log(param)

    if (req.body.join_password === req.body.join_passwordcheck) {
        db.query('INSERT INTO users(name, id, email, password) VALUES (?, ?, ?, ?)', param, (err, row) => {
            if (err) console.log(err)
            else console.log('insert')
        })
    }
    else {
        res.send(
            "<script>alert('비밀번호가 다릅니다.');location.href='/signup/';</script>"
        )
        console.log('비밀번호가 다릅니다.')
    }

})
export default login

