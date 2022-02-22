import * as user from '../database/user.js'
import express from "express"
import { user_directory } from '../config/directory.js'
import path from 'path'
import fs from 'fs'

const router = express.Router()
router.post('/userinfo', (req, res) => {
    user.finduser(['id'], [req.session.uid])
    .then((result) => {
        if(result.length == 0) {
            res.send('Session expired')
        }
        else {
            //res.send(result[0])
            res.send({
                name: result[0].name,
                photoLink: `/user-directory/${result[0].id}`,
                role: '1학년 2반 4번'
            })
        }
    })
    .catch((error) => {
        console.error(error)
    })
})

router.post('/menus', (req, res) => {

    res.send(JSON.parse(fs.readFileSync(path.join(user_directory, 'sidebar-menus', 'user.json'), 'utf8')))
    //console.log(menus)
})


export default router