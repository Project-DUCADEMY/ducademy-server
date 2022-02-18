import * as user from '../database/user.js'
import express from "express"

const router = express.Router()
router.post('/userinfo', (req, res) => {
    user.finduser(['id'], [req.session.uid])
    .then((result) => {
        res.send(result[0])
    })
    .catch((error) => {
        console.error(error)
    })
})

export default router