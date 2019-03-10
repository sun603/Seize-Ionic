var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var uid;

/*
* TODO: Search in the matching_pool
*
*
*       JSON in:
*       {
*           auth_token: <String>,
*           seat_type: <String>,
*           noise_level: <int>
*       }
*
*           school: <String>,
*           class: <int>, // class standing
*           major: <String>,
* */

router.post('/', function(req, res, next){
    var auth_code = req.body.auth_token;

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
        if (err) {
            res.json({
                "status": 404,
                "error message": "database connection error"
            })
        } else {
            auth_con.query(auth_sql, function (err, result) {
                if (result.length === 0) {
                    res.json({
                        "status": 201,
                        "error message": "invalid auth_token"
                    });
                } else {
                    uid = result[0].uid;

                    let profile_sql = "SELECT * FROM profile WHERE uid = " + uid;

                    let profile_con = mysql.createConnection({
                        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                        user: "shao44",
                        password: "ShaoZH0923?",
                        database: "cs307_sp19_team31"
                    });

                    profile_con.connect(function(err){
                        profile_con.query(profile_sql, function(err, result){
                            if (result.length === 0){
                                // user profile does not exist
                                res.json({
                                    "status": 201
                                });
                            }
                            else{
                                // TODO: subtract user profile info.
                                var school = result[0].school;
                                var class_stand = result[0].class;
                                var major = result[0].major;

                                let match_sql = "SELECT * FROM matching_pool WHERE" +
                                    "school = \"" + school + "\", " +
                                    "AND class_stand = ";
                            }
                        });
                    });
                }
            });
        }
    });
});

module.exports = router;