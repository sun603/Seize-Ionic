var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");

it('should return 200 with authentication token', function(done)
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
            //token = res.body.auth;
        })
        .end(done);
});

