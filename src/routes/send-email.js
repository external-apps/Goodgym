const sendEmailFunction = require('../send-email.js');

const sendEmail = (req, res) => {
  const body = req.body;
  sendEmailFunction(body, (err, body) => {
    if (err) {
      console.log(err);
      res.send('Email not sent!');
    } else {
      console.log('body:', body);
      res.send('Email sent');
    }
  });
};

module.exports = sendEmail;
