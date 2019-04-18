const now = new Date();
const date = now.getUTCFullYear() + '/' +
    (now.getUTCMonth() + 1) + '/' +
    now.getUTCDate();
const time = now.getUTCHours() + ':' +
    now.getUTCMinutes() + ':' +
    now.getUTCSeconds();

let real_time = date + ' ' + time;

console.log(real_time);

