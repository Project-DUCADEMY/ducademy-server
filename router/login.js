const express = require('express')
const router = express.Router()

router.post('', (request, response) => {

    console.log('login require');
    require('../helpers').redirect(response, "http://localhost:3000/mainpage")
})
module.exports = router;