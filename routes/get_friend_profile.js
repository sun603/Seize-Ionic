/*
*
* take <friend> uid
*
* return json friend profile
*
* */

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var uid;

router.post('/', function(req, res, next){
    uid = req.body.uid;

    var search_sql = "SELECT * FROM profile WHERE uid = " + uid;
    var search_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    search_con.connect(function(err){
        if (err){
            search_con.destroy();
            res.json({
                "status": 404,
                "error message": "database connection error"
            })
        }
        else{
            search_con.query(search_sql, function(err, result){
                if (result === undefined){
                    search_con.destroy();
                    res.json({
                        "status": 201,
                        "error message": "user does not exist"
                    })
                }
                else if (result.length === 0){
                    search_con.destroy();
                    res.json({
                        "status": 201,
                        "error message": "user does not exist"
                    })
                }
                else{
                    let name = result[0].name;
                    let pid = result[0].pic_id;
                    search_con.destroy();

                    if (pid === null){
                        let pic_dir = './profile_pic/' + "unknown.jpg";
                        let pic_stream = base64_encode(pic_dir);
                        res.json({
                            "status":200,
                            "name": name,
                            "pic":pic_stream
                        });
                    }
                    else {

                        let pic_sql = "SELECT * FROM profile_pic WHERE pic_id = " + pid;
                        let pic_con = mysql.createConnection({
                            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                            user: "shao44",
                            password: "ShaoZH0923?",
                            database: "cs307_sp19_team31"
                        });

                        pic_con.connect(function (err) {
                            if (err) {
                                pic_con.destroy();
                                res.json({
                                    "status": 404,
                                    "error message": "database connection error"
                                });
                            } else {

                                pic_con.query(pic_sql, function (err, result) {
                                    let pic_dir = './profile_pic/' + result[0].pic_file_name;
                                    let pic_stream = base64_encode(pic_dir);
                                    pic_con.destroy();
                                    res.json({
                                        "status":200,
                                        "name": name,
                                        "pic":pic_stream
                                    });
                                })
                            }
                        })
                    }

                }
            });
        }
    })

    function base64_encode(file) {
        //var bitmap = fs.readFileSync(file);
        var bitmap = fs.readFileSync(path.join(__dirname, file));
        return new Buffer(bitmap).toString('base64');
    }
});

module.exports = router;