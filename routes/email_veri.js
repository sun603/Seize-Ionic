/* ===== email verification code ===== */

var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {

    var email = req.body.email;

    var send = require('./send.js');

    var mail = {
        from: 'Seize_Team <jjjjjames.szh@gmail.com>',
        subject: 'test',
        to: 'wsjamesszh@hotmail.com',
        text: 'This is the email test'
    }

    send(mail);

    res.json({
        "status": 200
    });
});

module.exports = router;