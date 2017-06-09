'use strict';

const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NM_USER,
    pass: process.env.NM_PASS
  }
});

function sendEmail (body, templateName, templateOptions, cb) {
  const emailTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'views', templateName), 'utf8');
  const template = handlebars.compile(emailTemplate);
  const emailContent = template(templateOptions);

  const mailOptions = {
    from: '"GoodGym" <goodgym1000@gmail.com>',
    subject: 'Your task sheet',
    text: 'task sheet',
    html: emailContent,
    to: body.emailAddress
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return cb(error);
    }
    return cb(null, `Message ${info.messageId} sent: ${info.response}`);
  });
}

module.exports = sendEmail;
