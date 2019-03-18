var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");

var auth_code;

/*
* testing getprofile for user:
* email: shao44@purdue.edu
* password: ShaoZH0923?
* */
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
            auth_code = res.body.auth_token;
            console.log("auth_code = ", auth_code);
        })
        .end(done);
});

it('checking if cancelling post correctly', function(done)
{
    let data = {
        "auth_code": auth_code
    }

    request(server)
        .post("/cancel_post")
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