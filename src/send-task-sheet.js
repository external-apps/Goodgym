'use strict';

const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const nodemailer = require('nodemailer');
require('env2')(`${__dirname}/../.env`);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NM_USER,
    pass: process.env.NM_PASS
  }
});

function sendTaskSheet (body, cb) {
  // The tasksheet.js route needs to house the information from the tasksheet (but non editable)
  // in this email we need to send a link to this task sheet, the run_id is needed so that we can
  // show the user the correct tasksheet. The tasksheet route needs to do a get request to get the
  // correct information to be templated in.

  const emailTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'views', 'task-sheet-email.hbs'), 'utf8');
  const template = handlebars.compile(emailTemplate);
  const emailContent = template({
    taskSheetURL: body.taskSheetURL,
    firstName: body.firstName
  });

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

module.exports = sendTaskSheet;
