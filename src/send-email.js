'use strict';

const nodemailer = require('nodemailer');
require('env2')(`${__dirname}/../.env`);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NM_USER,
    pass: process.env.NM_PASS
  }
});

function sendMail (body, cb) {
  console.log('body:', body);
  var emailAddress = body.emailAddress;
  var emailContent = composeEmailBody(body.qrAddress);

  const mailOptions = {
    from: '"GoodGym" <goodgym1000@gmail.com>',
    subject: 'Your task sheet',
    text: 'task sheet',
    html: emailContent,
    to: emailAddress
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return cb(error);
    }
    return cb(null, `Message ${info.messageId} sent: ${info.response}`);
  });
}

function composeEmailBody (content) {
  return `<h2>
            You can find sign-in your runners via QR code <a href="${content}">here!</a>
          </h2>`;
}

module.exports = sendMail;
