/* ====== profile  ===== */

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var multer = require('multer');

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
*   uid: uid
* }
*
* response:
* {
*   status: 200 (success), 201: (uid not exist)
*   uid: uid
*   year: grad_year
*   university: university
* }
* */
router.get('/', function(req, res, next){
    let uid = req.body.uid;
    let select_sql = "select * from profile where uid = " + uid;

    let select_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    select_con.connect(function(err){
        select_con.query(select_sql, function(err, result){
            if (result[0] === null){
                res.json({
                    "status": 201,
                    "err_message": "uid does not exist"
                });
            }
            else{
                let year = result[0].grad_year;
                let university = result[0].university;
                console.log(year);
                console.log(university);
                if (year === undefined){
                    year = null;
                }
                if (university === undefined){
                    university = null;
                }
                res.json({
                    "status": 200,
                    "uid": uid,
                    "year": year,
                    "university": university
                });
            }
        });
    });
});

module.exports = router;