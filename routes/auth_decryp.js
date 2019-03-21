/* ===== grabbing the uid belongs to the authentication code. =====
*
* return -1 for db or unknown error
* return 0 for invalid authentication code
* return uid for valid authentication code
*
* */

var mysql = require('mysql');

module.exports = function (auth_code) {
    var uid = 0;
    console.log("authentication code = ", auth_code);

    var con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    var sql = "SELECT * FROM user_auth WHERE auth_code = \"" + auth_code + "\"";
    console.log(sql);

    con.connect(function(err){
        if (err){
            // db connection error
            console.log("error");
            return -1; // -1 for error
        }
        else{
            con.query(sql, function(err, result){
                if (result[0] === null){
                    console.log("invalid authcode");
                    return 0; // 0 for invalid authentication code.
                }
                else{
                    uid = result[0].uid;
                    console.log("user exists. uid = ", uid);
                    return uid;
                }
                con.release();
            });
        }
    });
}