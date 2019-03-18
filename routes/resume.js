var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var uid;

/*
* TODO: 1. get user id through auth_token
*       2. check if posting exists with the provided user id
*       3. response with dedicated states.
*
* */
router.post('/', function(req, res, next){
    let auth_code = req.body.auth_token;
});

module.exports = router;