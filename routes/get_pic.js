var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');

router.post('/', function(req, res, next){
    var auth_code = req.body.auth_token;
    var uid;
    var pic_id;
    var pic_dir = './profile_pic/';

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
                    res.json({
                        "status": 201
                    });
                } else {
                    uid = result[0].uid;
                    console.log("uid = ", uid);
                    if (uid <= 0) {
                        // invalid auth_token
                        console.log("invalid auth_token");
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
                                    let picId = result[0].pic_id;
                                    if (picId === null){
                                        pic_dir = pic_dir + "unknown.jpg";
                                    }
                                    else{
                                        pic_dir = pic_dir + picId;
                                    }

                                    var pic_stream = base64_encode(pic_dir);
                                    //console.log(pic_stream);
                                    //base64_decode(pic_stream, 'test.jpg');
                                    res.json({
                                        "status":200,
                                        "pic":pic_stream
                                    });
                                }
                            });
                        });
                    }
                }
            });
        }
    });

    function base64_encode(file) {
        //var bitmap = fs.readFileSync(file);
        var bitmap = fs.readFileSync(path.join(__dirname, file));
        return new Buffer(bitmap).toString('base64');
    }

    function base64_decode(base64str, file) {
        var bitmap = new Buffer(base64str, 'base64');
        fs.writeFileSync(path.join(__dirname, file), bitmap);
        console.log('******** decoding complete ********');
    }
});

module.exports = router;