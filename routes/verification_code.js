module.exports = function (n) {
    var str = "";

    var i = 0;
    for (i = 0; i < 8; i++){
        var n = Math.round(Math.random() * 36);
        if (n < 26){
            var c_int = "A".charCodeAt(0) + n;
            var c = String.fromCharCode(c_int);
            str += c;
        }
        else{
            var temp = n - 26;
            str = str + temp;
        }
    }
    return str;
}
