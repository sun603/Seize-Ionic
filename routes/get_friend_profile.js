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
var fs = require('fs');
var path = require('path');
const unknown = "/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QOLaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzAxNCA3OS4xNTY3OTcsIDIwMTQvMDgvMjAtMDk6NTM6MDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDU4MDExNzQwNzIwNjgxMTgwODM5MjNCREVDMzg5ODQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTBEOTAyRkExM0YyMTFFNUEyMThEM0EzODJEOTMyNzkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTBEOTAyRjkxM0YyMTFFNUEyMThEM0EzODJEOTMyNzkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphMTQxNWE0OS1jMTQ4LTRiZDgtYWViMS02MjY5OWZjYWNlZTYiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkMWNhZmZmZS01YzVjLTExNzgtYWY4Zi04OWNmNGZjMzdjZmYiLz4gPC9yZGY6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"


router.post('/', function(req, res, next){
    let uid_string = req.body.uid + ""; // array, 长字符串
    let uid_array = uid_string.split(",");

    let final_result = [];

    function f1() {
        return new Promise(function (resolve) {
            uid_array.forEach(function (uid) {
                var search_sql = "SELECT * FROM profile WHERE uid = " + uid;
                var search_con = mysql.createConnection({
                    host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                    user: "shao44",
                    password: "ShaoZH0923?",
                    database: "cs307_sp19_team31"
                });

                search_con.connect(function (err) {
                    if (err) {
                        search_con.destroy();
                        res.json({
                            "status": 404,
                            "error message": "database connection error"
                        })
                    } else {
                        search_con.query(search_sql, function (err, result) {
                            if (result === undefined) {
                                search_con.destroy();
                                res.json({
                                    "status": 201,
                                    "error message": "user does not exist"
                                })
                            } else if (result.length === 0) {
                                search_con.destroy();
                                res.json({
                                    "status": 201,
                                    "error message": "user does not exist"
                                })
                            } else {
                                let name = result[0].name;
                                let pid = result[0].pic_id;
                                search_con.destroy();

                                if (pid === null) {
                                    let temp_data = {
                                        "index": uid,
                                        "name": name,
                                        "pic": unknown
                                    };
                                    final_result.push(temp_data);
                                    console.log("data pushed ", uid);
                                } else {

                                    let pic_sql = "SELECT * FROM profile_pic WHERE pic_id = " + uid;
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
                                                let pic_stream = result[0].pic_data;
                                                // let pic_stream = base64_encode(pic_dir);
                                                pic_con.destroy();
                                                // res.json({
                                                //     "status": 200,
                                                //     "name": name,
                                                //     "pic": pic_stream
                                                // });
                                                let temp_data = {
                                                    "index": uid,
                                                    "name": name,
                                                    "pic": pic_stream
                                                };
                                                final_result.push(temp_data);
                                                console.log("result pushed: ", uid);
                                            })
                                        }
                                    })
                                }

                            }
                        });
                    }
                });
            });
            setTimeout(resolve, 1000);
        });
    }

    async function f2() {
        // console.log('before callback');
        // callback();
        // console.log('after callback');
        await f1();
        //console.log("final result: ", final_result);
        let return_data = {
            "status": 200,
            "info": final_result
        }
        res.json(return_data);
    }

    f2();



    function base64_encode(file) {
        //var bitmap = fs.readFileSync(file);
        var bitmap = fs.readFileSync(path.join(__dirname, file));
        return new Buffer(bitmap).toString('base64');
    }
});

module.exports = router;