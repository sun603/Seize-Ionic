/* ===== email verification code ===== */

var express = require('express');
var router = express.Router();

/*
* TODO: 1. Generate random verification code
*       2. Create validated time for vorificaiton code.
*
*
* */
router.post('/', function(req, res, next) {

    var email = req.body.email;

    var send = require('./send.js');
    var v_code = require('./verification_code');

    var v = v_code(1);
    console.log(v);

    var txt = 'This is your Seize verification code:\n\n\t';
    txt += v;
    txt += '\n\nPlease do not share with other people.\n';
    txt += 'This code is valid for 5 minutes\n';

    var mail = {
        from: 'Seize_Team <mailfromseize@gmail.com>',
        subject: 'test',
        to: 'wsjamesszh@hotmail.com',
        text: txt
    }

    send(mail);

    res.json({
        "status": 200,
        "verification": v
    });
});

module.exports = router;