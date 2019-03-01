var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");


it('should return {"status":201}', function(done)
{
    request(server)
        .post("/profile")
        .expect(200)
        .expect(function(res)
        {
            assert.equal(res.text, '{"status":201}');
        })
        .end(done);
});

it('should return 200 with authentication token', function(done)
{
    let data = {
        "auth_token": "QE0B2E8KXO"
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
        })
        .end(done);
});