module.exports = function (uid) {
    var authcode = "";
    var i = 0;
    for (i = 0; i < 10; i++){
        var n = Math.round(Math.random() * 36);
        if (n < 26){
            var c_int = "A".charCodeAt(0) + n;
            var c = String.fromCharCode(c_int);
            authcode += c;
        }
        else{
            var temp = n - 26;
            authcode = str + temp;
        }
    }
    return authcode;
}