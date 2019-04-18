var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var mysql = require('mysql');

var token;
var uid = 64;
/*
* testing get friend list for user:
* email: test_user_1@purdue.edu
* password: TestUSER1
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

it ('checking for incorrect auth_token', function(done){
    let data = {
        "auth_token": "1234567890"
    };

    request(server)
        .post("/post_seat")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
});

it ('check if route post is successful', function(done){
    let data = {
        "auth_token": token
    };

    request(server)
        .post('/get_friend_list')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res){
            assert.equal(res.body.status, 200);
            assert.equal(res.body.index, uid);
        })
        .end(done);

});
