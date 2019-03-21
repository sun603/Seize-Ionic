var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var uid;

/*
* TODO: 1. LOGOUT from current account
*       2. cancel post
* */

router.post('/', function(req, res, next) {
    let auth_code = req.body.auth_token;

    let logout_sql = "SELECT * FROM user_auth WHERE auth_code = \"" + auth_code + "\"";

    let logout_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    logout_con.connect(function(err){
        if (err) {
            logout_con.destroy();
            res.json({
                "status": 404,
                "error message": "database connection error"
            })
        }
        else{
            logout_con.query(logout_sql, function(err, result){
                if (result === undefined){
                    logout_con.destroy();
                    res.json({
                        "status": 201,
                        "error message": "invalid auth_token"
                    });
                }
                else if (result.length === 0) {
                    logout_con .destroy();
                    res.json({
                        "status": 201,
                        "error message": "invalid auth_token"
                    });
                }
                else{
                    let uid = result[0].uid;

                    let delete_sql_1 = "DELETE FROM user_auth WHERE uid = " + uid;
                    let delete_sql_2 = "DELETE FROM matching_pool WHERE uid = " + uid;

                    let delete_con = mysql.createConnection({
                        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                        user: "shao44",
                        password: "ShaoZH0923?",
                        database: "cs307_sp19_team31"
                    });

                    delete_con.connect(function(err){
                        delete_con.query(delete_sql_1, function(err, result){});
                        delete_con.query(delete_sql_2, function(err, result){});
                        delete_con.destroy();
                        res.json({
                            "status": 200
                        })
                    });
                }
            });
        }
    });
});

module.exports = router;