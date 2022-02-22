import express from "express"
import { user_directory } from "../config/directory.js"
import path from 'path'
import fs from 'fs'

const router = express.Router()
router.get('/*', (req, res) => {
    try {
        let file = path.join(user_directory, req.url)
        if(fs.existsSync(file)) {
            res.sendFile(file)
        }
        else {
            res.status(404)
            res.send()
            console.log(file)
        }
    }
    catch(ex) {
        console.log(ex)
    }
})

export default router