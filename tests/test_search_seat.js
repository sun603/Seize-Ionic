var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var mysql = require('mysql');

var token;
var uid = 64;

/*
* testing post seat for user:
* email: test_user_1@purdue.edu
* password: TestUSER1
* */
it('acquiring token from login', function(done)
{
    let login_sql = "SELECT * FROM user_auth WHERE uid = 64"
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

it('check for incorrect auth_token', function(done){
    let data = {
        "auth_token": "1234567890"
    };

    request(server)
        .post("/search_seat")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
})

it('post seat by user', function(done)
{
    let data = {
        "auth_token": token,
        "seat_type": "Sofa",
        "noise_level": 1,
        "library":"Hicks Undergraduate"
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

it ('check for correct auth_token and search', function(done){
    let data = {
        "auth_token": token,
        "seat_type": "Sofa",
        "noise_level": 1,
        "library":"Hicks Undergraduate"
    };
    request(server)
        .post("/search_seat")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res)
        {
            assert.equal(res.body.status, 200);
            assert.equal(res.body.uid, 64);
        })
        .end(done);
})

it ('delete the testing post', function(done){
    let delete_sql = "delete from matching_pool where uid < 65";
    let delete_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    delete_con.connect(function(err){
        delete_con.query(delete_sql, function(err, result){
            assert.equal(0, 0);
            done();
        });
    });
});