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
*       Hidden info (from auth_token):
*           school: <String>,
*           class: <int>, // class standing
*           major: <String>,
*
*
*       JSON response:
*       {
*           status: 200(match found), 201(invalid token), 202(match not found)
*       }
* */

router.post('/', function(req, res, next){
    let auth_code = req.body.auth_token;
    let seat_type = req.body.seat_type;
    let noise_level = req.body.noise_level;
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
        if (err) {
            auth_con.destroy();
            res.json({
                "status": 404,
                "error message": "database connection error"
            })
        } else {
            auth_con.query(auth_sql, function (err, result) {
                if (result === undefined){
                    auth_con.destroy();
                    res.json({
                        "status": 201,
                        "error message": "invalid auth_token"
                    });
                }
                else if (result.length === 0) {
                    auth_con.destroy();
                    res.json({
                        "status": 201,
                        "error message": "invalid auth_token"
                    });
                } else {
                    uid = result[0].uid;
                    auth_con.destroy();

                    let profile_sql = "SELECT * FROM profile WHERE uid = " + uid;

                    let profile_con = mysql.createConnection({
                        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                        user: "shao44",
                        password: "ShaoZH0923?",
                        database: "cs307_sp19_team31"
                    });

                    profile_con.connect(function(err){
                        profile_con.query(profile_sql, function(err, result){
                            if (result === undefined){
                                profile_con.destroy();
                                res.json({
                                    "status": 404,
                                    "error message": "database connection capacity error"
                                });
                            }
                            else if (result.length === 0){
                                // user profile does not exist
                                profile_con.destroy();
                                res.json({
                                    "status": 201
                                });
                            }
                            else{
                                // TODO: subtract user profile info.
                                var school = result[0].school;
                                var class_stand = result[0].class; // VARCHAR(45)
                                var major = result[0].major;

                                profile_con.destroy();

                                let match_sql = "SELECT * FROM matching_pool WHERE " +
                                    "school = \"" + school + "\" " +
                                    "AND seat_type = \"" + seat_type + "\" " +
                                    "AND noise_level <= " + noise_level +
                                    " AND library = \"" + library + "\"";

                                console.log(match_sql);

                                let match_con = mysql.createConnection({
                                    host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                    user: "shao44",
                                    password: "ShaoZH0923?",
                                    database: "cs307_sp19_team31"
                                });

                                match_con.connect(function(err){
                                    match_con.query(match_sql, function(err, result){
                                        if (result === undefined){
                                            // MATCH NOT FOUND
                                            match_con.destroy();
                                            res.json({
                                                "status": 202,
                                                "err_message": "match not found undefined"
                                            })
                                        }
                                        else if (result[0] === undefined){
                                            // MATCH NOT FOUND
                                            match_con.destroy();
                                            res.json({
                                                "status": 202,
                                                "err_message": "match not found 0"
                                            })
                                        }
                                        else{
                                            // MATCH FOUND
                                            // TODO: 1. DELETE the post in matching_pool
                                            //       2. RESPONSE with the mathced user id
                                            //       3. (if time allows) send notification to post-er
                                            //
                                            //      "AND class = \"" + class_stand + "\" " +
                                            //      "AND major = \"" + major + "\" " +

                                            console.log(result);
                                            // 0. Find the best match from

                                            var n = result.length;
                                            var grid = new Array(n);
                                            var i;
                                            var j;
                                            for (i = 0; i < n; i++){
                                                grid[i] = new Array(2);
                                                grid[i][0] = result[i].uid;
                                                var count = 0;
                                                if (result[i].class === class_stand){
                                                    count = count +5;
                                                }
                                                if (result[i].major === major){
                                                    count = count + 1;
                                                }
                                                grid[i][1] = count;
                                            }

                                            for (i = 0; i < (n - 1); i++){
                                                for (j = i + 1; j < n; j++){
                                                    if (grid[i][1] < grid[j][1]){
                                                        var temp0 = grid[i][0];
                                                        var temp1 = grid[i][1];

                                                        grid[i][0] = grid[j][0];
                                                        grid[i][1] = grid[j][1];

                                                        grid[j][0] = temp0;
                                                        grid[j][1] = temp1;
                                                    }
                                                }
                                            }

                                            match_con.destroy();

                                            // 1. EDIT the post in matching_pool
                                            let poster_uid = grid[0][0];
                                            //let poster_uid = result[0].uid;
                                            //let delete_sql = "delete from matching_pool where uid = " + poster_uid;
                                            let delete_sql = "update matching_pool set matching_status = " + uid + " where uid = " + poster_uid;

                                            let delete_con = mysql.createConnection({
                                                host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                                user: "shao44",
                                                password: "ShaoZH0923?",
                                                database: "cs307_sp19_team31"
                                            });

                                            console.log(delete_sql);

                                            delete_con.connect(function(err){
                                                delete_con.query(delete_sql, function(err, result){
                                                    delete_con.destroy();
                                                })
                                            })

                                            // 2. (if time allows) send notification to post-er

                                            // 3. RESPONSE with the mathced user id
                                            // grab the username

                                            let profile_sql = "SELECT name FROM profile WHERE uid = " + poster_uid;
                                            let profile_con = mysql.createConnection({
                                                host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                                user: "shao44",
                                                password: "ShaoZH0923?",
                                                database: "cs307_sp19_team31"
                                            });

                                            profile_con.connect(function(err){
                                                profile_con.query(profile_sql, function(err, result){
                                                    let name = result[0].name;
                                                    profile_con.destroy();
                                                    res.json({
                                                        "status": 200,
                                                        "uid": poster_uid,
                                                        "name": name
                                                    });
                                                })
                                            })
                                        }
                                    });
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