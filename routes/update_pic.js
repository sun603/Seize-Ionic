var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');

/*
* TODO: RECEIVE FILE STREAM OF THE PICTURE AND UPDATE IT ON THE SERVER.
* GET: auth_token, picture file steam
* RESPONSE: status:
* */
router.post('/', function(req, res, next){
    var auth_code = req.body.auth_token;    // user authentication token
    var uid;                                // user id
    var pic_stream = req.body.pic;          // picture file stream

    var auth_sql = "SELECT * FROM user_auth WHERE auth_code = \"" + auth_code + "\"";
    console.log(auth_sql);
    var auth_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    auth_con.connect(function(err){
        if (err) {
            auth_con.destroy();
            // db connection error
            res.json({
                "status": 404
            });
        }
        else{
            // db connection successful
            auth_con.query(auth_sql, function(err, result){
                if (result.length === 0) {
                    console.log("invalid auth_token");
                    auth_con.destroy();
                    res.json({
                        "status": 201
                    });
                } else {
                    uid = result[0].uid;
                    console.log("uid = ", uid);
                    auth_con.destroy();
                    if (uid <= 0) {
                        // invalid auth_token
                        console.log("invalid auth_token");
                        res.json({
                            "status": 201
                        });
                    } else {
                        // auth_token correct, find the profile
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
                                    select_con.destroy();
                                    res.json({
                                        "status": 202,
                                        "err_message": "user profile does not exist"
                                    });
                                } else {
                                    // user profile found
                                    let picId = result[0].pic_id;
                                    select_con.destroy();
                                    if (picId === null){
                                        // user currently have no pic
                                        console.log("no profile yet");
                                        let pic_con = mysql.createConnection({
                                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                            user: "shao44",
                                            password: "ShaoZH0923?",
                                            database: "cs307_sp19_team31"
                                        });
                                        // pic_stream
                                        let pic_sql = "insert profile_pic (pic_id, pic_data) values (" + uid + ", ";
                                        pic_sql += "\"" + pic_stream + "\")";
                                        console.log("uploading profile pic");
                                        console.log("pic_sql: ", pic_sql);
                                        pic_con.connect(function(err){
                                            pic_con.query(pic_sql, function(err, result){
                                                // picture added;
                                                console.log("profile pic uploaded");
                                                pic_con.destroy();

                                                let update_sql = "update profile set pic_id = " +
                                                    uid + " where uid = " + uid;
                                                let update_con = mysql.createConnection({
                                                    host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                                    user: "shao44",
                                                    password: "ShaoZH0923?",
                                                    database: "cs307_sp19_team31"
                                                });

                                                update_con.connect(function(err){
                                                    update_con.query(update_sql, function(err, result){
                                                        // added pic_id into profile table
                                                        update_con.destroy();
                                                        res.json({
                                                            "status": 200
                                                        })
                                                    })
                                                })
                                            })
                                        });
                                    }
                                    else{
                                        // user already have pic
                                        let update_sql = "update profile_pic set pic_data = \"" +
                                            pic_stream + "\" where pic_id = " + uid;
                                        let update_con = mysql.createConnection({
                                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                            user: "shao44",
                                            password: "ShaoZH0923?",
                                            database: "cs307_sp19_team31"
                                        });

                                        update_con.connect(function(err){
                                            update_con.query(update_sql, function(err, result){
                                                // added pic_id into profile table
                                                update_con.destroy();
                                                res.json({
                                                    "status": 200
                                                })
                                            })
                                        })
                                    }
                                }
                            });
                        });
                    }
                }
            });
        }
    });

    function base64_decode(base64str, file) {
        var bitmap = new Buffer(base64str, 'base64');
        fs.writeFileSync(path.join(__dirname, file), bitmap);
        //fs.writeFileSync(file, bitmap);
        console.log('******** decoding complete ********');
    }
});

module.exports = router;
