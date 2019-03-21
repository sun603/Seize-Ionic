var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var mysql = require('mysql');

var token;
var uid = 64;

/*
* testing post_seat for user:
* email: shao44@purdue.edu
* password: ShaoZH0923?
* */
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

it ('update profile by user', function(done)
{
    let data = {
        "auth_token": token,
        "name": "test_user_1",
        "gender": "Male",
        "school": "Purdue University (West Lafayette)",
        "major": "Computer Science",
        "class": "Junior",
        "description": null
    };
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

it('checking if name is updated to profile', function(done){
     let check_sql = "SELECT * FROM profile WHERE uid = " + uid;
     console.log("check_sql: ", check_sql);
     let check_con = mysql.createConnection({
         host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
         user: "shao44",
         password: "ShaoZH0923?",
         database: "cs307_sp19_team31"
     });

     check_con.connect(function(err){
         check_con.query(check_sql, function(err, result){
             assert.equal(result[0].name, "test_user_1");
         });
     });
     done();
 });

it('checking if gender is updated to profile', function(done){
    let check_sql = "SELECT * FROM profile WHERE uid = " + uid;
    console.log("check_sql: ", check_sql);
    let check_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    check_con.connect(function(err){
        check_con.query(check_sql, function(err, result){
            assert.equal(result[0].gender, "Male");
        });
    });
    done();
});

it('checking if school is updated to profile', function(done){
    let check_sql = "SELECT * FROM profile WHERE uid = " + uid;
    console.log("check_sql: ", check_sql);
    let check_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    check_con.connect(function(err){
        check_con.query(check_sql, function(err, result){
            assert.equal(result[0].school, "Purdue University (West Lafayette)");
        });
    });
    done();
});

it('checking if class is updated to profile', function(done){
    let check_sql = "SELECT * FROM profile WHERE uid = " + uid;
    console.log("check_sql: ", check_sql);
    let check_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    check_con.connect(function(err){
        check_con.query(check_sql, function(err, result){
            assert.equal(result[0].class, "Junior");
        });
    });
    done();
});

it('checking if major is updated to profile', function(done){
    let check_sql = "SELECT * FROM profile WHERE uid = " + uid;
    console.log("check_sql: ", check_sql);
    let check_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    check_con.connect(function(err){
        check_con.query(check_sql, function(err, result){
            assert.equal(result[0].major, "Computer Science");
        });
    });
    done();
});

it('checking if description is updated to profile', function(done){
    let check_sql = "SELECT * FROM profile WHERE uid = " + uid;
    console.log("check_sql: ", check_sql);
    let check_con = mysql.createConnection({
        host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
        user: "shao44",
        password: "ShaoZH0923?",
        database: "cs307_sp19_team31"
    });

    check_con.connect(function(err){
        check_con.query(check_sql, function(err, result){
            assert.equal(result[0].description, null);
        });
    });
    done();
});
