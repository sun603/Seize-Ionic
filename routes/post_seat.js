var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var uid;

/*
* TODO: STORE USER'S POST SEAT INFORMATION AND STORE IT INTO DEDICATED MYSQL TABLE
*       Information including:
*           uid
*           school
*           class
*           major
*           seat_type
*           noise_level
*           library
* */
router.post('/', function(req, res, next){
    var auth_code = req.body.auth_token;
    var seat_type = req.body.seat_type;
    var noise_level = req.body.noise_level;
    let library = req.body.library;

    // TODO: grab user profile from auth_token
    var auth_sql = "SELECT * FROM user_auth WHERE auth_code = \"" + auth_code + "\"";
    console.log(auth_sql);
    var auth_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    auth_con.connect(function(err) {
        if (err){
            res.json({
                "status": 404,
                "error message": "database connection error"
            })
        }
        else{
            auth_con.query(auth_sql, function(err, result){
                if (result.length === 0){
                    res.json({
                        "status": 201,
                        "error message": "invalid auth_token"
                    });
                }
                else{
                    uid = result[0].uid;
                    console.log("uid = ", uid);
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
                                    "status": 201,
                                    "err_message": "user does not exist"
                                });
                            } else {
                                // TODO: insert all user info into the matching pool.
                                var school = result[0].school;
                                var class_standing = result[0].class;
                                var major = result[0].major;
                                // uid, seat_type, noise_level

                                let post_sql = "insert matching_pool (uid, school, class, major, seat_type, library, noise_level)" +
                                    " values " +
                                    "(" + uid + ", " +
                                    "\"" + school + "\", " +
                                    "\"" + class_standing + "\", " +
                                    "\"" + major + "\", " +
                                    "\"" + seat_type + "\", " +
                                    "\"" + library + "\", " +
                                    noise_level + ")";
                                let post_con = mysql.createConnection({
                                    host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                    user: "shao44",
                                    password: "ShaoZH0923?",
                                    database: "cs307_sp19_team31"
                                });

                                post_con.connect(function(err){
                                    post_con.query(post_sql, function(err, result){
                                        res.json({
                                            "status": 200
                                        });
                                    })
                                });
                            }
                        });
                    });
                }
            });
        }
    });
});

module.exports = router;