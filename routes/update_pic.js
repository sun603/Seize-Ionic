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
    var pic_id;                             // picture id
    var pic_dir = './profile_pic/';         // file path of the profile picture
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
                                        // no picture found yet
                                        /*
                                        * TODO: 1. insert pic_file_name into profile_pic table
                                        *       2. get the pic_id of the newly inserted picture.
                                        *       3. add the new pic_id into the user profile.
                                        * */
                                        pic_dir = pic_dir + "user_id_" + uid + ".jpg";
                                        console.log("pic_dir: ", pic_dir);
                                        base64_decode(pic_stream, pic_dir);
                                        let pic_sql = "insert profile_pic (pic_file_name)\n" +
                                            "values\n" +
                                            "(\"" + "user_id_" + uid + ".jpg" +
                                            "\");"
                                        let pic_con = mysql.createConnection({
                                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                            user: "shao44",
                                            password: "ShaoZH0923?",
                                            database: "cs307_sp19_team31"
                                        });

                                        // TODO 1. insert new pic
                                        pic_con.connect(function(err){
                                            pic_con.query(pic_sql, function(err, result){
                                                // picture inserted.
                                                // TODO 2. get pic_id
                                                let pic_id_sql = "select * from profile_pic where pic_file_name = ";
                                                pic_id_sql = pic_id_sql + "\"" +
                                                    "user_id_" + uid + ".jpg" + "\"";
                                                pic_con.query(pic_id_sql, function(err2, result2){
                                                    pic_id = result2[0].pic_id;

                                                    // TODO 3. update profile's pic_id

                                                    let update_sql = "update profile set pic_id = " +
                                                        pic_id + " where uid = " + uid;
                                                    pic_con.query(update_sql, function(err3, result3){
                                                        pic_con.destroy();
                                                        res.json({
                                                            "status": 200
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    }
                                    else{
                                        let pic_sql = "select * from profile_pic where pic_id = " + picId;
                                        let pic_con = mysql.createConnection({
                                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                                            user: "shao44",
                                            password: "ShaoZH0923?",
                                            database: "cs307_sp19_team31"
                                        });

                                        pic_con.connect(function(err){
                                            pic_con.query(pic_sql, function(err, result){
                                                // update user's existing profile picture.
                                                pic_dir = pic_dir + result[0].pic_file_name;
                                                console.log("pic_dir: ", pic_dir);
                                                base64_decode(pic_stream, pic_dir);
                                                pic_con.destroy();
                                                res.json({
                                                    "status": 200
                                                });
                                            });
                                        });
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