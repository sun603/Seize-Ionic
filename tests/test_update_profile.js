var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var mysql = require('mysql');

var token;
var uid;

/*
* testing post_seat for user:
* email: shao44@purdue.edu
* password: ShaoZH0923?
* */
it('acquiring token from login', function(done)
{
    let data = {
        "email": "test_user_1@purdue.edu",
        "password": "TestUSER1"
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
                user: "test_user1",
                password: "TestUSER1",
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


it ('update profile by user', function(done)
{
    let data = {
        "name": "test_user_1",
        "gender": "Male",
        "school": "Purdue University (West Lafayette)",
        "major": "Computer Science",
        "class": "Junior",
        "description": null
    };
    request(server)
         .post("/getprofile")
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

it('checking if info is updated to profile', function(done){
     let check_sql = "SELECT * FROM profile WHERE uid = " + uid;
     console.log("check_sql: ", check_sql);
     let check_con = mysql.createConnection({
         host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
         user: "shao44",
         password: "ShaoZH0923?",
         database: "cs307_sp19_team31"
     });

     check_con.connect(function(err){
         check_con.query(check_sql, function(err, result){
             assert.equal(result[0].name, "Ziheng Shao");
             assert.equal(result[0].gender, "Male");
             assert.equal(result[0].school, "Purdue University (West Lafayette)");
             assert.equal(result[0].class, "Junior");
             assert.equal(result[0].major, "Computer Science");
             assert.equal(result[0].description, null);
         });
     });
     done();
 });