const sendEmailFunction = require('../send-email.js');

const sendEmail = (req, res) => {
  const body = req.body;
  sendEmailFunction(body, (err, payload) => {
    if (err) {
      console.log(err, 'Check that the goodgym1000@gmail.com ' +
            'email account has not been suspended/deactivated');
      res.send('Email not sent!');
    } else {
      console.log(payload);
      res.send('Email sent');
    }
  });
};

module.exports = sendEmail;
