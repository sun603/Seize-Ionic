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

function f2(){
    // clear expired posts
    let time_stamp = Date.now() - 1000*60;
    console.log("checked time: ", time_stamp);
    let checking_sql = "DELETE FROM matching_pool WHERE time_posted < " + time_stamp;

    let checking_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    checking_con.connect(function(err){
        checking_con.query(checking_sql, function(err, result){
            // expired post deleted.
            console.log("expired post checked.");
        });
    });
}

async function f1(){
    await f2();
    return;
}

router.post('/', function(req, res, next){
    f1();

    let auth_code = req.body.auth_token;
    let seat_type = req.body.seat_type;
    let noise_level_low_search = req.body.noise_level1;
    let noise_level_high_search = req.body.noise_level2;
    let lib = req.body.library;
    lib = lib + "";// array,长字符串
    console.log("lib = " + lib);
    let library_search = lib.split(","); // array of libraries from searcher
    let pc_serach = req.body.pc;
    let power_search = req.body.power;

    let t = 1;

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
                                    "school = \"" + school + "\"" +
                                    " AND seat_type = \"" + seat_type + "\"" +
                                    " AND pc = " + pc_serach +
                                    " AND power = " + power_search;

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
                                                // class 和 major 的适配度
                                                if (result[i].class === class_stand){
                                                    count = count +5;
                                                }
                                                if (result[i].major === major){
                                                    count = count + 1;
                                                }

                                                // check if noise level match

                                                if ( noise_level_high_search >= result[i].noise_level &&
                                                     noise_level_low_search <= result[i].noise_level){
                                                    // do nothing, valid noise level
                                                }
                                                else{
                                                    t = 0;
                                                }

                                                // check if library is match
                                                let n = library_search.length;
                                                for (j = 0; j < n; j++) {
                                                    if (result[i].library === library_search[j]) {
                                                        t = t + 1;
                                                    }
                                                }
                                                if (t < 2){
                                                    match_con.destroy();
                                                    res.json({
                                                        "status": 202,
                                                        "err_message": "match not found 0"
                                                    })
                                                }
                                                grid[i][1] = count;
                                            }
                                            if (t === 2) {

                                                for (i = 0; i < (n - 1); i++) {
                                                    for (j = i + 1; j < n; j++) {
                                                        if (grid[i][1] < grid[j][1]) {
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
                                                let delete_sql = "update matching_pool set matching_status = " + uid + " where uid = " + poster_uid;

                                                let delete_con = mysql.createConnection({
                                                    host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                                    user: "shao44",
                                                    password: "ShaoZH0923?",
                                                    database: "cs307_sp19_team31"
                                                });

                                                console.log(delete_sql);

                                                delete_con.connect(function (err) {
                                                    delete_con.query(delete_sql, function (err, result) {
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

                                                profile_con.connect(function (err) {
                                                    profile_con.query(profile_sql, function (err, result) {
                                                        let name = result[0].name;
                                                        profile_con.destroy();
                                                        res.json({
                                                            "status": 200,
                                                            "uid": poster_uid,
                                                            "name": name
                                                        });
                                                    })
                                                });
                                            }
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
