/* ====== profile  ===== */

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var multer = require('multer');
var auth_decryp = require('./auth_decryp');

/* ===== POST for update profile ===== */
/*
* take:
* {
*   auth_token: <String>
*   name: <String> (45 character max)
    gender: m/f/n
    school: <String> “Purdue University”
    major: <String> (User input, 45 char max)
    class: 1/2/3/4/5
    description: <String> (200 char max)
}
* }
*
* respose:
* {
*   status: 200(for success)
*           201(auth_code incorrect)
*           202(uid does not exist)
*           203(err occured)
*           404(db connection error)
*   (optional)err_message: String
* }
* */
router.post('/', function(req, res, next) {
    let auth_code = req.body.auth_token;
    //var uid = auth_decryp(auth_code);
    // expand auth decryp

    var uid;

    let name = req.body.name;
    let gender = req.body.gender;
    let school = req.body.university;
    let major = req.body.major;
    let year = req.body.class;
    let descrip = req.body.description;


    var auth_sql = "SELECT * FROM user_auth WHERE auth_code = \"" + auth_code + "\"";
    console.log(auth_sql);
    var auth_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });
    auth_con.connect(function(err){
        if (err){
            // db connection error
            console.log("error");
            return -1; // -1 for error
        }
        else{
            auth_con.query(auth_sql, function(err, result){
                if (result.length === 0){
                    console.log("invalid authcode");
                    res.json({
                        "status": 201
                    });
                }
                else{
                    uid = result[0].uid;
                    console.log("user exists. uid = ", uid);

                    var con = mysql.createConnection({
                        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                        user: "shao44",
                        password: "ShaoZH0923?",
                        database: "cs307_sp19_team31"
                    });

                    var sql = "SELECT * FROM profile WHERE uid = ";
                    sql = sql + uid;
                    console.log(sql);

                    con.connect(function(err){
                        if (err){
                            res.json({"status": 404});
                        }
                        else {
                            con.query(sql, function(err, result){
                                if (result.length === 0){
                                    //no profile found
                                    res.json({
                                        "status":202,
                                        "err_message": "profile for uid does not exist."
                                    });
                                }
                                else{
                                    // profile found.
                                    //let sql_header = "let update_sql = \"UPDATE profile SET grad_year = \";\n" +
                                    //   update_sql += year + \" WHERE uid = \" + uid;"

                                    let update_sql = "UPDATE profile SET ";
                                    let sql_tail = " WHERE uid = " + uid;
                                    var t = 1;

                                    /*
                                    * name
                                    * gender
                                    * school
                                    * major
                                    * year
                                    * descrip
                                    * */

                                    if (name !== undefined){
                                        if (t === 0){
                                            update_sql += ", ";
                                        }
                                        t = 0;
                                        update_sql += "name = \"" + name + "\"";
                                    }
                                    if (gender !== undefined){
                                        if (t === 0){
                                            update_sql += ", ";
                                        }
                                        t = 0;
                                        update_sql += "gender = \"" + gender + "\"";
                                    }
                                    if (school !== undefined){
                                        if (t === 0){
                                            update_sql += ", ";
                                        }
                                        t = 0;
                                        update_sql += "school = \"" + school + "\"";
                                    }
                                    if (major !== undefined){
                                        if (t === 0){
                                            update_sql += ", ";
                                        }
                                        t = 0;
                                        update_sql += "major = \"" + major + "\"";
                                    }
                                    if (year !== undefined){
                                        if (t === 0){
                                            update_sql += ", ";
                                        }
                                        t = 0;
                                        update_sql += "class = \"" + year + "\"";
                                    }
                                    if (descrip !== undefined){
                                        if (t === 0){
                                            update_sql += ", ";
                                        }
                                        t = 0;
                                        update_sql += "description = \"" + descrip + "\"" + sql_tail;
                                    }

                                    update_sql += sql_tail;

                                    let update_con = mysql.createConnection({
                                        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                        user: "shao44",
                                        password: "ShaoZH0923?",
                                        database: "cs307_sp19_team31"
                                    });
                                    console.log(update_sql);
                                    update_con.connect(function(err){
                                        update_con.query(update_sql, function(err, result){

                                            res.json({
                                                "status": 200
                                            })
                                        });
                                    });

                                }
                            });
                        }
                    });

                }
            });
        }
    });



});

/* ===== GET for acquiring profile ===== */
/*
* take:
* {
*   auth_token: auth
* }
*
* response:
* {
*   status: 200 (success), 201: (invalid auth_token), 202: (user does not exist)
*   name: varchar(45)
*   gender: m/f/n
*   school: "Purdue University"
*   major: varchar(45)
*   class: 1/2/3/4/5
*   description: varchar(200)
* }
* */
router.get('/', function(req, res, next){
    let auth_code = req.body.auth_token;
    //let uid = auth_decryp(auth);
    var uid;
    var auth_sql = "SELECT * FROM user_auth WHERE auth_code = \"" + auth_code + "\"";
    console.log(auth_sql);
    var auth_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });
    auth_con.connect(function(err) {
        if (err) {
            // db connection error
            console.log("error");
            throw(err);
            return -1; // -1 for error
        } else {
            auth_con.query(auth_sql, function (err, result) {
                if (result.length === 0) {
                    console.log("invalid authcode");
                    res.json({
                        "status": 201
                    });
                } else {
                    uid = result[0].uid;
                    console.log("uid = ", uid);
                    if (uid <= 0) {
                        // invalid auth_token
                        res.json({
                            "status": 201
                        });
                    } else {
                        let select_sql = "select * from profile where uid = " + uid;
                        let select_con = mysql.createConnection({
                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                            user: "shao44",
                            password: "ShaoZH0923?",
                            database: "cs307_sp19_team31"
                        });
                        console.log(select_sql);
                        select_con.connect(function (err) {
                            select_con.query(select_sql, function (err, result) {
                                if (result.length === 0) {
                                    res.json({
                                        "status": 202,
                                        "err_message": "user does not exist"
                                    });
                                } else {
                                    let name = result[0].name;
                                    let gender = result[0].gender;
                                    let school = result[0].school;
                                    let year = result[0].class;
                                    let major = result[0].major;
                                    let descrip = result[0].description;
                                    if (name === undefined) {
                                        name = null;
                                    }
                                    if (gender === undefined) {
                                        gender = null;
                                    }
                                    if (school === undefined) {
                                        school = null;
                                    }
                                    if (year === undefined) {
                                        year = null;
                                    }
                                    if (major === undefined) {
                                        major = null;
                                    }
                                    if (descrip === undefined) {
                                        descrip = null;
                                    }
                                    res.json({
                                        "status": 200,
                                        "name": name,
                                        "gender": gender,
                                        "university": school,
                                        "major": major,
                                        "year": year,
                                        "description": descrip
                                    });
                                }
                            });
                        });
                    }
                }
            });
        }
    });
});

module.exports = router;