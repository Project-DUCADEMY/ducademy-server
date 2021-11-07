const express = require('express');
const router = express.Router();
const path = require('path');
const front_folder = path.join(process.cwd(), '..', 'ducademy-front');

/* GET */
router.get(function (req, res) {
    const { method, url } = req;
    console.log(url, method);
    res.sendFile(front_folder + '/ducami-login.html')
});

module.exports = router;
