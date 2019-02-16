/* ===== user signup ===== */

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var multer = require('multer');

/* POST users listing. */
router.post('/', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    //res.send('respond with a resource');
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('body: ', req.body);

    if (password === null){
        //password is empty
        res.json({"status": 201,
                  "err_message": "password is empty"});
    }
    else {

        var con = mysql.createConnection({
            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
            user: "shao44",
            password: "ShaoZH0923?",
            database: "cs307_sp19_team31"
        });

        var sql = "SELECT * FROM userlogin WHERE email = \"";
        sql = sql + email;
        sql = sql + "\"";

        con.connect(function (err) {
            if (err) {
                res.json({"status": 404,
                          "err_message": "db connection failure"});
                //throw err;
            } else {
                console.log("password no empty");
                console.log(sql);

                con.query(sql, function(err, result) {
                    if (result[0] == null){
                        console.log("email not exist, valid for sign up");

                        /* insert communication */
                        var insert_con = mysql.createConnection({
                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                            user: "shao44",
                            password: "ShaoZH0923?",
                            database: "cs307_sp19_team31"
                        });

                        insert_con.connect(function(err){
                            if (err){}
                            else{
                                var insert_sql = "insert userlogin";
                                insert_sql += " (email, password)";
                                insert_sql += " values";
                                insert_sql += " (\"" + email + "\",\"" + password + "\")";
                                insert_con.query(insert_sql, function(err, result){
                                });
                                console.log("insert success");

                                insert_sql = "select * from userlogin where email = \"";
                                insert_sql += email + "\"";
                                insert_con.query(insert_sql, function(err, result){
                                    res.json({"status": 200,
                                              "uid":result[0].uid});
                                });
                            }
                        });






                    }
                    else{
                        console.log("email already exists.");
                        res.json({"status": 202,
                                  "err_message": "email already exists"});
                    }
                });
            }
        });
    }

});

module.exports = router;