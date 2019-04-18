var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var mysql = require('mysql');

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
    let login_sql = "SELECT * FROM user_auth WHERE uid = 64";
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
/*
it('should return 200 by checking new password', function(done)
{
    let data = {
        "email": "shao44@purdue.edu",
        "password": "ShaoZH0923?"
    };
    request(server)
        .post("/password_reset")
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
*/
