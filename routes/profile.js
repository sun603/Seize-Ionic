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
*   uid: uid
*   year: grad_year
*   university: 'Purdue University'
* }
*
* respose:
* {
*   status: 200(for success)
*           201(profile uid does not exist)
*   (optional)err_message: String
* }
* */
router.post('/', function(req, res, next) {
    var uid = req.body.uid;
    var year = req.body.year;
    var university = req.body.university;

    console.log('uid: ', uid);
    console.log('year: ', year);
    console.log('university: ', university);

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
                if (result[0] == null){
                    //no profile found
                    res.json({
                        "status":201,
                        "err_message": "profile for uid does not exist."
                    })
                }
                else{
                    // profile found, need to update
                    if (year === undefined && university === undefined){
                        // do nothing.
                        console.log("update nothing");
                        res.json({"status":200});
                    }
                    else if (year === undefined && university !== undefined){
                        //only need to update university
                        console.log("update university");
                        let update_sql = "UPDATE profile SET university = \"";
                        update_sql += university + "\" WHERE uid = " + uid;

                        let update_con = mysql.createConnection({
                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                            user: "shao44",
                            password: "ShaoZH0923?",
                            database: "cs307_sp19_team31"
                        });

                        console.log(update_sql);

                        update_con.connect(function(err){
                            update_con.query(update_sql, function(err, result){
                                res.json({"status":200});
                            });
                        });
                    }
                    else if (year !== undefined && university === undefined){
                        //only need to update year
                        console.log("update year");
                        let update_sql = "UPDATE profile SET grad_year = ";
                        update_sql += year + " WHERE uid = " + uid;

                        let update_con = mysql.createConnection({
                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                            user: "shao44",
                            password: "ShaoZH0923?",
                            database: "cs307_sp19_team31"
                        });

                        console.log(update_sql);

                        update_con.connect(function(err){
                            update_con.query(update_sql, function(err, result){
                                res.json({"status":200});
                            });
                        });
                    }
                    else{
                        // need to update both
                        console.log("update university and year");
                        let update_sql = "UPDATE profile SET grad_year = ";
                        update_sql += year + ", university = \"";
                        update_sql += university + "\" WHERE uid = " + uid;

                        let update_con = mysql.createConnection({
                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                            user: "shao44",
                            password: "ShaoZH0923?",
                            database: "cs307_sp19_team31"
                        });

                        console.log(update_sql);

                        update_con.connect(function(err){
                            update_con.query(update_sql, function(err, result){
                                res.json({"status":200});
                            });
                        });
                    }
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
    let auth = req.body.auth_token;
    let uid = auth_decryp(auth);
    if (uid <= 0){
        // invalid auth_token
        res.json({
            "status": 201
        });
    }
    else {
        let select_sql = "select * from profile where uid = " + uid;

        let select_con = mysql.createConnection({
            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
            user: "shao44",
            password: "ShaoZH0923?",
            database: "cs307_sp19_team31"
        });

        select_con.connect(function (err) {
            select_con.query(select_sql, function (err, result) {
                if (result[0] === null) {
                    res.json({
                        "status": 202,
                        "err_message": "user does not exist"
                    });
                } else {
                    let name = result[0].name;
                    let gender = result[0].gender;
                    let school = resuilt[0].school;
                    let year = result[0].class;
                    let major = result[0].major;
                    let descrip = result[0].description;
                    console.log(year);
                    console.log(university);
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
                        "name":name,
                        "gender":gender,
                        "school":school,
                        "major":major,
                        "year":year,
                        "description": descrip
                    });
                }
            });
        });
    }
});

module.exports = router;