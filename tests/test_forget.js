var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");

/*
* testing forget for user:
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

it('should return 200 by checking email from login', function(done)
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
        })
        .end(done);
});



