var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/', function(req, res, next){
    var email = req.body.email;
    // TODO: 1. checking if email exists
    console.log('email: ', email);

    var check_sql = "SELECT * FROM userlogin WHERE email = \"" + email + "\"";
    console.log(check_sql);

    var check_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    check_con.connect(function(err){
        if (err){
            res.json({
                "status": 404,
                "err_message": "db connection error"
            });
        }
        else{
            check_con.query(check_sql, function(err, result){
                if (result.length === 0){
                    // email does not exist
                    res.json({
                        "status": 201,
                        "err_message": "email does not exist"
                    });
                }
                else{
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
                        to: email,
                        text: txt
                    }

                    send(mail);

                    res.json({
                        "status": 200
                    });
                }
            });
        }
    });
});

module.exports = router;