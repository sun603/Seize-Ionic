var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var username = req.query.username;
    var password = req.query.password;
    //res.send('respond with a resource');
    console.log('username: ', username);
    console.log('password: ', password);

    var con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    var sql = "SELECT * FROM userlogin WHERE username = ";
    sql = sql + username;
    sql = sql + " AND pswd = ";
    sql = sql + password;
    //res.send(sql);
    console.log(sql);

    con.connect(function(err) {
        //if (err) throw err;
        console.log("Connected");
        con.query(sql, function(err, result) {
            //if (err) throw err;
            console.log(result);
        });
    });

});

module.exports = router;