let firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBLOOFB7s4NYHZJrgdY3QIMCjpeTl71igU",
    authDomain: "clean-healer-232121.firebaseapp.com",
    databaseURL: "https://clean-healer-232121.firebaseio.com",
    storageBucket: "clean-healer-232121.appspot.com",
};

function add_friend(uid, friend_uid){
    firebase.initializeApp(config);
    let database = firebase.database();
    let data = {
        "id": friend_uid
    };
    database.ref('friend_list/' + uid + '/' + friend_uid).update(data);

    data = {
        "id": uid
    };
    database.ref('friend_list/' + friend_uid + '/' + uid).update(data);

}

module.exports = add_friend;
