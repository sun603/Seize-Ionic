var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var mysql = require('mysql');

var token;
var uid;

/*
* testing getprofile for user:
* email: shao44@purdue.edu
* password: ShaoZH0923?
* */
// it('acquiring token from login', function(done)
// {
//     let data = {
//         "email": "shao44@purdue.edu",
//         "password": "ShaoZH0923?"
//     };
//     request(server)
//         .post("/email_login")
//         .send(data)
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .expect(function(res)
//         {
//             assert.equal(res.body.status, 200);
//             token = res.body.auth;
//             console.log("auth_token = ", token);
//
//             let uid_sql = "SELECT * FROM user_auth WHERE auth_code = \"" + token + "\"";
//             let uid_con = mysql.createConnection({
//                 host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
//                 user: "shao44",
//                 password: "ShaoZH0923?",
//                 database: "cs307_sp19_team31"
//             });
//
//             uid_con.connect(function(err){
//                 uid_con.query(uid_sql, function(err, result){
//                     uid = result[0].uid;
//                 })
//             })
//         })
//         .end(done);
// });
//
// it('post seat by user', function(done)
// {
//     let data = {
//         "auth_token": token,
//         "seat_type": "sofa",
//         "noise_level": 1,
//         "library":"hicks"
//     };
//
//     request(server)
//         .post("/post_seat")
//         .send(data)
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .expect(function(res)
//         {
//             assert.equal(res.body.status, 200);
//         })
//         .end(done);
// });
//
// it('checking if info is in the posting pool', function(done){
//     let check_sql = "SELECT * FROM matching_pool WHERE uid = " + uid;
//     console.log("check_sql: ", check_sql);
//     let check_con = mysql.createConnection({
//         host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
//         user: "shao44",
//         password: "ShaoZH0923?",
//         database: "cs307_sp19_team31"
//     });
//
//     check_con.connect(function(err){
//         check_con.query(check_sql, function(err, result){
//             assert.equal(result[0].seat_type, "sofa");
//             assert.equal(result[0].noise_level, 1);
//         });
//     });
//     done();
// });
var auth_token;
var uid;

function login(email){
    return new Promise((resolve, reject) => {
        let login_sql = "SELECT * FROM userlogin WHERE email = \"" + email + "\"";
        let login_con = mysql.createConnection({
            host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
            user: "shao44",
            password: "ShaoZH0923?",
            database: "cs307_sp19_team31"
        });

        login_con.connect(function(err){
            login_con.query(login_sql, function(err, result){
                uid = result[0].uid;
                let auth_sql = "SELECT * FROM user_auth WHERE uid = " + uid;
                login_con.query(auth_sql, function(err, result){
                    auth_token = result[0].auth_code;
                    resolve(auth_token);
                })
            })

        });
    });
}

Promise.all([
    login("test_user_1@purdue.edu")
])
    .then((data) => auth_token = data)
    .then((auth_token) =>
    {
        let data = {
        "auth_token": auth_token,
        "seat_type": "Sofa",
        "noise_level": 1,
        "library":"hicks"
    };

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
    })