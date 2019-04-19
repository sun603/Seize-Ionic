var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res, next){

    var con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    var sql = "SELECT * FROM userlogin WHERE uid = 0";

    con.connect(function(err){
        con.query(sql, function(err, result){
            console.log("this message should not be printed: ", result[2].length);
            res.json({"status": "ok"});
        })
    });

});

module.exports = router;
