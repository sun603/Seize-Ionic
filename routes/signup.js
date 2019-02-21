/* ===== user signup ===== */

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pass_veri = require('./pass_veri');

/* POST users listing. */
router.post('/', function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var university = req.body.university;
    var major = req.body.major;
    var year = req.body.class;
    //res.send('respond with a resource');
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('body: ', req.body);

    var pass_vali = 1;
    if(password.length < 6){
        pass_vali = -1;
    }
    else if(password.length > 30){
        pass_vali = -1;
    }
    else if(password.search(/[a-z]/) < 0){
        pass_vali = -1;
    }
    else if(password.search(/[A-Z]/) < 0){
        pass_vali = -1;
    }
    else if (password.search(/[0-9]/) < 0) {
        pass_vali = -1;
    }

    if (pass_vali === -1){
        //password is invalid
        res.json({"status": 201,
                  "err_message": "invalid password"});
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
                                var uid = 0;
                                var insert_sql = "insert userlogin";
                                insert_sql += " (email, password)";
                                insert_sql += " values";
                                insert_sql += " (\"" + email + "\",\"" + password + "\")";
                                insert_con.query(insert_sql, function(err, result){
                                });
                                console.log(insert_sql);
                                console.log("insert success");

                                insert_sql = "select * from userlogin where email = \"";
                                insert_sql += email + "\"";
                                insert_con.query(insert_sql, function(err, result){
                                    uid = result[0].uid;
                                    var profile_sql;
                                    profile_sql = "insert profile";
                                    profile_sql += "(uid, school, class, name, major)";
                                    profile_sql += "values";
                                    profile_sql += "(" + uid + ",\"" + university + "\",";
                                    profile_sql += year + ", \"" + name + "\", \"" + major + "\")";
                                    console.log(profile_sql);

                                    var profile_con = mysql.createConnection({
                                        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                        user: "shao44",
                                        password: "ShaoZH0923?",
                                        database: "cs307_sp19_team31"
                                    });

                                    profile_con.query(profile_sql, function(err, result){

                                        res.json({
                                            "status":200
                                        })
                                    });

                                });

                            }
                        })
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