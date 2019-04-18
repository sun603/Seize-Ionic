let friend_uid = 68;

function add_admin(uid){
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

    ////////////////////////////////////
    let firebase = require('firebase');

    let database = firebase.database();
    let data = {
        "id": friend_uid,
        "roomid": room_id
    };
    database.ref('friend_list/' + uid + '/' + friend_uid).update(data);

    data = {
        "id": uid,
        "roomid": room_id
    };
    database.ref('friend_list/' + friend_uid + '/' + uid).update(data);

    // send message

    let message = "Wellcome to Seize!\nSeize is an app to help to share and" +
        " find seats in college libraries. Enjoy!"

    data = {
        "id": friend_uid,
        "message": message,
        "timestamp": real_time
    };
    database.ref('room-message/' + room_id).push(data);

}

module.exports = add_admin;
