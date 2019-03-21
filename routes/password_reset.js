var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var pass_vali = 1;
    if(password.length < 6){
        pass_vali = -1;
    }
    else if(password.length > 30){
        pass_vali = -1;
    }
    else if(password.search(/[a-z]/) < 0){
        pass_vali = -1;
    }
    else if(password.search(/[A-Z]/) < 0){
        pass_vali = -1;
    }
    else if (password.search(/[0-9]/) < 0) {
        pass_vali = -1;
    }

    if (pass_vali === -1){
        //password is invalid
        res.json({"status": 201,
            "err_message": "invalid password"});
    }

    var ep_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    var ep_sql = "UPDATE userlogin SET password = \"" + password + "\" WHERE email = \"" + email + "\"";

    ep_con.connect(function(err) {
        if (err) {
            ep_con.destroy();
            res.json({
                "status": 404
            });
        } else {
            ep_con.query(ep_sql, function (err, result) {
                ep_con.destroy();
                res.json({
                    "status": 200
                });
            });
        }
    });
});

module.exports = router;