var nodemailer = require('nodemailer');

var config = {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'jjjjjames.szh@gmail.com',
        pass: 'tiuopnfgqvstnxtd'
    }
};

var transporter = nodemailer.createTransport(config);

module.exports = function (mail_sent) {
    transporter.sendMail(mail_sent, function (error, info) {
        if (error) {
            console.log(error);
        }

        console.log("email sent", info.response);
    });
}