import express from "express"
import * as sign from "../database/sign.js"
import * as user from "../database/user.js"
import convertpassword from '../config/convertpassword.js'
const router = express.Router()

router.post('/in', (req, res) => {
    const datas = req.body
    convertpassword(datas.password).then(password => {
        user.finduser(['email', 'password'], [datas.email, password])
        .then(result => {
            if(result.length == 1) { 
                req.session.uid = result[0].id;            
                req.session.isLogined = true;
                req.session.save(() => {                           
                    res.send(req.session.uid.toString(10));
                });
            }
            else if(result.length < 1) { res.send('Nonexistent user') }
            else if(result.length > 1) { console.error('sign up error: ' + result.length) }
        })
        .catch(error => {
            console.log(error)
        })
    })
})
router.post('/up', (req, res) => {
    sign.signup(req.body)
    .then(result => {
        res.send('sign up success: ' + result.email)
    })
    .catch(error => {
        console.log('sign up error: ' + error)
    })
})
router.post('/out', (req, res) => {
    req.session.destroy( (err) => {
        if(err) { console.log(err) }
        res.redirect('/')
    });
})

export default router