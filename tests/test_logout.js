var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var mysql = require('mysql');

var token;
var uid = 64;

/*
* testing logout for user:
* email: shao44@purdue.edu
* password: ShaoZH0923?
* */
it('acquiring token from login', function(done)
{
    let login_sql = "SELECT * FROM user_auth WHERE uid = 64";
    let login_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });
    login_con.connect(function(err){
        login_con.query(login_sql, function(err, result){
            token = result[0].auth_code;
            assert.equal(result[0].uid, 64);
            done();
        })
    })
});

it('checking if cancel post is correct.', function(done){
    let delete_sql_1 = "DELETE FROM user_auth WHERE uid = " + uid;
    let delete_sql_2 = "DELETE FROM matching_pool WHERE uid = " + uid;

    let delete_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });
    delete_con.connect(function(err){
        delete_con.query(delete_sql_2, function(err, result){
            let check_sql = "SELECT * FROM matching_pool WHERE uid = " + uid;
            console.log("check_sql: ", check_sql);
            let check_con = mysql.createConnection({
                host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                user: "shao44",
                password: "ShaoZH0923?",
                database: "cs307_sp19_team31"
            });

            check_con.connect(function(err){
                check_con.query(check_sql, function(err, result){
                    assert.equal(result.length, 0);
                    done();
                });
            });
        });
    });
});