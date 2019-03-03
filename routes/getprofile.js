var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/', function(req, res, next){
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
            res.json({
                "status": 404
            })
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