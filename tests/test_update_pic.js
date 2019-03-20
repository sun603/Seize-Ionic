var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var mysql = require('mysql');

var token;
var uid;
var picId;

/*
* testing update_pic for user:
* email: shao44@purdue.edu
* password: ShaoZH0923?
* */
it('acquiring token and uid from login', function(done)
{
    let data = {
        "email": "shao44@purdue.edu",
        "password": "ShaoZH0923?"
    };
    request(server)
        .post("/email_login")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res)
        {
            assert.equal(res.body.status, 200);
            token = res.body.auth;
            console.log("auth_token = ", token);

            let uid_sql = "SELECT * FROM user_auth WHERE auth_code = \"" + token + "\"";
            let uid_con = mysql.createConnection({
                host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                user: "shao44",
                password: "ShaoZH0923?",
                database: "cs307_sp19_team31"
            });

            uid_con.connect(function(err){
                uid_con.query(uid_sql, function(err, result){
                    uid = result[0].uid;
                })
            })
        })
        .end(done);
});

it('checking pic id', function(done)
{
    let data = {
        "email": "shao44@purdue.edu",
        "password": "ShaoZH0923?"
    };
    request(server)
        .post("/email_login")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res)
        {
            assert.equal(res.body.status, 200);
            token = res.body.auth;
            console.log("auth_token = ", token);

            let pic_sql = "select * from profile_pic where pic_id = " + picId;
            lconsole.log("pic_sql: ", pic_sql);
            let pic_con = mysql.createConnection({
                host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
                user: "shao44",
                password: "ShaoZH0923?",
                database: "cs307_sp19_team31"
            });

            pic_con.connect(function(err){
                pic_con.query(pic_sql, function(err, result){
                    picId = result[0].pic_id;
                })
            })
        })
        .end(done);
});
