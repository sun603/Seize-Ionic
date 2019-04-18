let firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBLOOFB7s4NYHZJrgdY3QIMCjpeTl71igU",
    authDomain: "clean-healer-232121.firebaseapp.com",
    databaseURL: "https://clean-healer-232121.firebaseio.com",
    storageBucket: "clean-healer-232121.appspot.com",
};

function add_friend(uid, friend_uid){
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
        (now.getUTCMonth() + 1) + '/' +
        now.getUTCDate();
    const time = now.getUTCHours() + ':' +
        now.getUTCMinutes() + ':' +
        now.getUTCSeconds();

    let real_time = date + ' ' + time;

    var room_id;
    if (uid < friend_uid){
        room_id = uid + '' + friend_uid;
    }
    else{
        room_id = friend_uid + '' + uid;
    }

    firebase.initializeApp(config);
    let database = firebase.database();
    let data = {
        "id": friend_uid,
        "roomid": room_id
    };
    database.ref('friend_list/' + uid + '/' + friend_uid).update(data);

    data = {
        "id": uid,
        "rommid": room_id
    };
    database.ref('friend_list/' + friend_uid + '/' + uid).update(data);

    // send message

    data = {
        "id": uid,
        "message": "hey what's up!",
        "timestamp": real_time
    };
    database.ref('room-message/' + room_id).push(data);

    data = {
        "id": friend_uid,
        "message": "hey what's up!",
        "timestamp": real_time
    };
    database.ref('room-message/' + room_id).push(data);

}

module.exports = add_friend;
