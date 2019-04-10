/*
*
* take auth_token
*
* return uid
*
* */

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var uid;

router.post('/', function(req, res, next){
    var auth_code = req.body.auth_token;

    var auth_sql = "SELECT * FROM user_auth WHERE auth_code = \"" + auth_code + "\"";
    console.log(auth_sql);
    var auth_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    auth_con.connect(function (err) {
        if (err){
            auth_con.destroy();
            res.json({
                "status": 404,
                "error message": "database connection error"
            })
        }
        else{
            auth_con.query(auth_sql, function(err, result){
                if (result === undefined){
                    auth_con.destroy();
                    res.json({
                        "status": 201,
                        "error message": "invalid auth_token"
                    });
                }
                else if (result.length === 0){
                    auth_con.destroy();
                    res.json({
                        "status": 201,
                        "error message": "invalid auth_token"
                    });
                }
                else{
                    uid = result[0].uid;
                    auth_con.destroy();
                    res.json({
                        "status": 200,
                        "uid": uid
                    })
                }
            })
        }
    });
});

module.exports = router;