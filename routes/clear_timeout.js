var mysql = require('mysql');

module.exports = function(){

    function check(){
        return new Promise((resolve, reject) => {

        })
    }

    Promise.all([
        check()
    ])
        .then(console.log("check complete"))
        .catch((err) => console.log(err))
}
