const connection = require('./database/connection').connection
const express = require('express')
const router = express.Router()
const crypto = require('crypto');
router.post('', (request, response) => {
    console.log('join require');
    if (request.body.join_password != request.body.join_passwordcheck) {
        console.log("PASSWORD DIFFEREND")
    }
    const sql_query = `INSERT INTO test (id ,password) VALUES ('${request.body.join_name}', 
    '${crypto.createHash('sha256').update(process.env.PASSWORD_KEY).digest('base64')}');` //sql 쿼리문
    connection.query(sql_query, (err, results, fields) => {
        if (err) { console.log(err); }
        console.log(results);
    });

    require('../helpers').redirect(response, "http://localhost:3000/")
})
module.exports = router;