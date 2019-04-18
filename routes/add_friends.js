let firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBLOOFB7s4NYHZJrgdY3QIMCjpeTl71igU",
    authDomain: "clean-healer-232121.firebaseapp.com",
    databaseURL: "https://clean-healer-232121.firebaseio.com",
    storageBucket: "clean-healer-232121.appspot.com",
};
firebase.initializeApp(config);

function add_friend(uid, friend_uid){

}

module.exports = add_friend;
