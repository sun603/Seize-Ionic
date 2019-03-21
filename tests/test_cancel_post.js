var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var mysql = require('mysql');

var token;
var uid = 64;

/*
* testing cancel_post for user:
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

it('post seat by user', function(done)
{
    let data = {
        "auth_token": token,
        "seat_type": "Sofa",
        "noise_level": 1,
        "library":"Hicks Underground"
    };

    request(server)
        .post("/post_seat")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res)
        {
            assert.equal(res.body.status, 200);
        })
        .end(done);
});

it('checking if cancel post is correct.', function(done){
    let delete_sql = "DELETE FROM matching_pool WHERE uid = " + uid;
    console.log("delete_sql: ", delete_sql);
    let delete_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });
    delete_con.connect(function(err){
        delete_con.query(delete_sql, function(err, result){
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
