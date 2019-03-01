/*
const assert = require("assert");
const httpMocks = require("node-mocks-http");
// const email_login_route = require("../routes/login_email.js");
const email_login_route = require('../app.js');

console.log("start");
describe("Example Router", () => {
    it("test", () => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "localhost:3000/email_login",
            json: {
                "email": "shao44@purdue.edu",
                "password": "ShaoZH0923?"
            }
        });
        console.log(mockRequest, '\n\n');
        var mockResponse = httpMocks.createResponse();

        email_login_route(mockRequest, mockResponse);
        console.log("mockResponse: ", mockResponse);
        const actualResponseBody = mockResponse._getData();
        console.log("actualResponseBody: ", actualResponseBody);
        const expectedResponseBody = 200;

        assert(actualResponseBody.body.status, expectedResponseBody);
        //assert(200, 200);
    });

}); */

var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");


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