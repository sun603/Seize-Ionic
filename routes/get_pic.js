var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');

router.post('/', function(req, res, next){
    var auth_code = req.body.auth_token;
    var uid;
    var pic_id;
    var pic_dir = './profile_pic/unknown.jpg';

    function base64_encode(file) {
        //var bitmap = fs.readFileSync(file);
        var bitmap = fs.readFileSync(path.join(__dirname, file));
        return new Buffer(bitmap).toString('base64');
    }

    function base64_decode(base64str, file) {
        var bitmap = new Buffer(base64str, 'base64');
        fs.writeFileSync(path.join(__dirname, file), bitmap);
        console.log('******** decoding complete ********');
    }

    var pic_stream = base64_encode(pic_dir);
    //console.log(pic_stream);
    //base64_decode(pic_stream, 'test.jpg');
    res.json({
        "status":200,
        "pic":pic_stream
    });
});

module.exports = router;