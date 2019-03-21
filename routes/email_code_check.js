var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/', function(req, res, next){
    var email = req.body.email;
    var code = req.body.code;

    console.log(email);
    console.log(code);

    var ec_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    var ec_sql = "SELECT * FROM email_code WHERE email = \"";
    ec_sql = ec_sql + email;
    ec_sql = ec_sql + "\"";

    console.log(ec_sql);

    ec_con.connect(function(err){
        if (err){
            res.json({
                "status":404
            });
        }
        else{
            ec_con.query(ec_sql, function(err, result){
                if (result.length === 0){
                    ec_con.release();
                    res.json({
                        "status": 501,
                        "err_message": "email does not exist"
                    });
                }
                else{
                    console.log(result);
                    var v_code = result[0].code;
                    console.log("v_code", v_code);
                    if (v_code == code){
                        ec_con.release();
                        res.json({
                            "status": 200
                        });
                    }
                    else{
                        ec_con.release();
                        res.json({
                            "status": 201,
                            "err_message": "wrong code"
                        });
                    }
                }
            });
        }
    });
});

module.exports = router;