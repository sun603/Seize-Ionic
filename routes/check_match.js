var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/*
* TODO: 1. SEARCH matching_pool for matching_status = 1
*       2.
*
*
*
*
* */

var uid;

router.post('/', function(req, res, next){
    let auth_code = req.body.auth_token;

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
            res.json({
                "status": 404,
                "error message": "database connection error"
            });
        } else{
            auth_con.query(auth_sql, function(err, result){
                if (result === undefined){
                    res.json({
                        "status": 404,
                        "error message": "database connection capacity error"
                    });
                }
                else if (result.length === 0) {
                    res.json({
                        "status": 201,
                        "error message": "invalid auth_token"
                    });
                }
                else{
                    uid = result[0].uid;

                    let search_sql = "SELECT * FROM matching_pool WHERE uid = " + uid;

                    let search_con = mysql.createConnection({
                        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                        user: "shao44",
                        password: "ShaoZH0923?",
                        database: "cs307_sp19_team31"
                    });

                    search_con.connect(function(err){
                        if (err){
                            res.json({
                                "status": 404,
                                "error message": "database connection error"
                            });
                        }
                        else{
                            search_con.query(search_sql, function(err, result){
                                if (result === undefined){
                                    res.json({
                                        "status": 404,
                                        "error message": "database connection capacity error"
                                    });
                                }
                                else if (result.length === 0) {
                                    res.json({
                                        "status": 205,
                                        "error message": "Unknown error - user not posted in matching pool"
                                    });
                                }
                                else{

                                    let search_uid = result[0].matching_status;
                                    console.log("search_uid: ", search_uid);
                                    if (search_uid === null){
                                        res.json({
                                            "status": 202,
                                            "error_message": "match not found"
                                        });
                                    }
                                    else {

                                        let delete_sql = "delete from matching_pool where uid = " + uid;

                                        let delete_con = mysql.createConnection({
                                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                            user: "shao44",
                                            password: "ShaoZH0923?",
                                            database: "cs307_sp19_team31"
                                        });

                                        console.log(delete_sql);

                                        delete_con.connect(function (err) {
                                            delete_con.query(delete_sql, function (err, result) {
                                                // DELETE complete
                                            })
                                        })

                                        // res.json({
                                        //     "status": 200,
                                        //     "matching_user": search_uid
                                        // })

                                        let profile_sql = "SELECT name FROM profile WHERE uid = " + search_uid;
                                        let profile_con = mysql.createConnection({
                                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                            user: "shao44",
                                            password: "ShaoZH0923?",
                                            database: "cs307_sp19_team31"
                                        });

                                        profile_con.connect(function (err) {
                                            profile_con.query(profile_sql, function (err, result) {
                                                let name = result[0].name;
                                                res.json({
                                                    "status": 200,
                                                    "uid": search_uid,
                                                    "name": name
                                                });
                                            })
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            });
        }
    });
});

module.exports = router;