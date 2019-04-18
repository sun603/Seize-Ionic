let _firebase = require('firebase');
var config = {
    apiKey: "AIzaSyBLOOFB7s4NYHZJrgdY3QIMCjpeTl71igU",
    authDomain: "clean-healer-232121.firebaseapp.com",
    databaseURL: "https://clean-healer-232121.firebaseio.com",
    storageBucket: "clean-healer-232121.appspot.com",
};

function f2(){
    _firebase.initializeApp(config);
}

async function fb_init(){
    // firebase
    await f2();
    return _firebase;
}

module.exports = fb_init;
