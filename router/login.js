const express = require('express')
const router = express.Router()
router.post('/join', (request, response) => {
    User.findOne({
        email: request.body.login_id,
        password: request.body.login_password
    }, (err, user) => {
        console.log(err, user)
    })
    require('./utility').redirect(response, "http://localhost:3000/")
})
module.exports = router;