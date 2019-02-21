/* ===== email and password login ===== */

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var auth_gen = require('./auth_create.js');

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
                        var u_auth = auth_gen(uid);
                        console.log("uid = " + uid);

                        var auth_con = mysql.createConnection({
                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                            user: "shao44",
                            password: "ShaoZH0923?",
                            database: "cs307_sp19_team31"
                        });

                        var auth_sql = "DELETE FROM user_auth WHERE uid = " + uid + ";";
                        // auth_sql += "INSERT user_auth (uid, auth_code)";
                        // auth_sql += " values ";
                        // auth_sql += "(" + uid + ",\"" + u_auth + "\")";
                        console.log(auth_sql);

                        auth_con.connect(function(err){
                            if (err){}
                            else{
                                auth_con.query(auth_sql, function(err, result){
                                    // old auth code deleted.

                                    let add_sql = "INSERT user_auth (uid, auth_code)";
                                    add_sql += " values ";
                                    add_sql += "(" + uid + ",\"" + u_auth + "\")";

                                    var add_con = mysql.createConnection({
                                        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                        user: "shao44",
                                        password: "ShaoZH0923?",
                                        database: "cs307_sp19_team31"
                                    });

                                    add_con.query(add_sql, function(err, result){
                                        res.json({
                                                "status": 200,
                                                "auth": u_auth
                                            });
                                    });

                                    // res.json({
                                    //     "status": 200,
                                    //     "auth": u_auth
                                    // });
                                });
                            }
                        });


                    }
                }
            });
        }
    });

});

module.exports = router;