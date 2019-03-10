var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");

var token;
var uid;

/*
* testing forget pass for user:
* email: shao44@purdue.edu
* password: ShaoZH0923?
* */
it('should return {"status":201}', function(done)
{
    request(server)
        .post("/email_login")
        .expect(200)
        .expect(function(res)
        {
            assert.equal(res.text, '{"status":201}');
        })
        .end(done);
});

it('acquiring token from login', function(done)
{
    let data = {
        "email": "shao44@purdue.edu",
        "password": "ShaoZH0923?"
    }
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
            console.log("token = ", token);
        })
        .end(done);
});

it('checking if getting pictures correctly', function(done)
{
    let data = {
        "auth_token": token
    }

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