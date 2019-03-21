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
                    check_con.destroy();
                    res.json({
                        "status": 201,
                        "err_message": "email does not exist"
                    });
                }
                else{
                    check_con.destroy();
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

                    var delete_sql = "DELETE FROM email_code WHERE email = \"" + email + "\"";

                    var delete_con = mysql.createConnection({
                        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                        user: "shao44",
                        password: "ShaoZH0923?",
                        database: "cs307_sp19_team31"
                    });

                    var insert_sql = "INSERT email_code (email, code) VALUES (\"";
                    insert_sql += email + "\", \"" + v + "\")";

                    var insert_con = mysql.createConnection({
                        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                        user: "shao44",
                        password: "ShaoZH0923?",
                        database: "cs307_sp19_team31"
                    });
                    delete_con.connect(function(err){
                        delete_con.query(delete_sql, function(err, result){
                            insert_con.connect(function(err){
                                insert_con.query(insert_sql, function(err, result){
                                    delete_con.destroy();
                                    insert_con.destroy();
                                    res.json({
                                        "status": 200
                                    });
                                });
                            });
                        });
                    });


                }
            });
        }
    });
});

module.exports = router;