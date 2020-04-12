let nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');

let dailyTemplate = fs.readFileSync(__dirname + '/html/dailyTemplate.html', 'utf8');
let htmlContent = handlebars.compile(dailyTemplate);
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'test@gmail.com',
        pass: 'test'
    }
});

let mailOptions = {
    from: 'test@gmail.com',
    to: null,
    subject: null,
    text: null,
    html: null
};


let sendMail = function (data) {
    mailOptions.to = data.toMailAddress;
    return new Promise((resolve, reject) => {
        let bodyContent = {};
        bodyContent = {
            'taskName': data.taskName,
            'date': data.date
        };
        mailOptions.subject = `${data.taskName} is to be completed by ${data.date}`;
        mailOptions.html = htmlContent(bodyContent);


        return transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve({
                    success: true
                });
            }
        });
    }).catch((e) => {
        console.log(e);
    });
}


module.exports = {
    sendMail
};
