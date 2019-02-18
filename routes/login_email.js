/* ===== email and password login ===== */

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* POST users listing. */
router.post('/', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    //res.send('respond with a resource');
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('body: ', req.body);

    var con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    var sql = "SELECT * FROM userlogin WHERE email = \"";
    sql = sql + email;
    sql = sql + "\"";
    //res.send(sql);
    console.log(sql);

    con.connect(function(err) {
        if (err) {
            res.json({"status":404});
            //throw err;
        }
        else {
            console.log("Connected");
            console.log("queueing");
            con.query(sql, function (err, result) {
                //if (err) throw err;
                console.log("result acquired");
                console.log(result);
                if (result[0] == null){
                    // wrong email
                    res.json({"status":201});
                }
                else {
                    var db_password = result[0].password;
                    if (db_password !== password) {
                        // wrong passwrod
                        res.json({"status": 202});
                    } else {
                        var uid = result[0].uid;
                        console.log("uid = " + uid);
                        res.json({
                            "status": 200,
                            "uid": uid
                        });
                    }
                }
            });
        }
    });

});

module.exports = router;