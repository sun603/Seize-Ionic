var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var mysql = require('mysql');

/*
* testing forget code for user:
* email: shao44@purdue.edu
* password: ShaoZH0923?
* */
var v_code;

it('acquiring verification code from forget_password', function(done)
{
    let login_sql = "SELECT * FROM email_code WHERE email = \"wsjamesszh@hotmail.com\"";
    let login_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });
    login_con.connect(function(err){
        login_con.query(login_sql, function(err, result){
            v_code = result[0].code;
            //console.log("acquiring, v_code: ", v_code);
            assert.equal(result[0].code, "7SE9P7BV");
            done();
        })
    })
});

it('checking if getting verification code correctly', function(done)
{
    let data = {
        "email": "wsjamesszh@hotmail.com",
        "code": v_code
    };
    console.log("checking, v_code: ", v_code);
    request(server)
        .post("/forgetcode")
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

it ('checking for incorrect verification code', function(done){
    let data = {
        "email": "wsjamesszh@hotmail.com",
        "code": "7SE9P8BV"
    };

    request(server)
        .post("/forgetcode")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
});