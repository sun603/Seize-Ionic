var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');

router.post('/', function(req, res, next){
    var auth_code = req.body.auth_token;
    var uid;
    var pic_id;
    var pic_dir = 'unknown.jpg';

    function base64_encode(file) {
        var bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');
    }

    function base64_decode(base64str, file) {
        var bitmap = new Buffer(base64str, 'base64');
        fs.writeFileSync(file, bitmap);
        console.log('******** 编码已转换为图片 ********');
    }

    var pic_stream = base64_encode(pic_dir);
    console.log(pic_stream);
});

module.exports = router;