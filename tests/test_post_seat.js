var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");

var token;
var seat_type;
var noise_level;

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
            token = res.body.auth;
            seat_type = res.body.seat_type;
            noise_level = res.body.noise_level;
            console.log("auth_token = ", token);
            console.log("seat_type = ", seat_type);
            console.log("noise_level = ", noise_level);
        })
        .end(done);
});

it('checking if posting seat correctly', function(done)
{
    let data = {
        "auth_token": token
    }

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