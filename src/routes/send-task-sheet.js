const sendEmail = require('../helpers/send-email');

const sendTasksheet = (req, res) => {
  if (process.env.NODE_ENV === 'testing') {
    res.send().status(200);
    return;
  }
  const body = req.body;
  const templateOptions = {
    taskSheetURL: body.taskSheetURL,
    firstName: body.firstName
  };

  sendEmail(body, 'task-sheet-email.hbs', templateOptions, (err, payload) => {
    if (err) {
      console.log(err, 'Check that the goodgym1000@gmail.com ' +
            'email account has not been suspended/deactivated');
      res.json('Email not sent!');
    } else {
      console.log(payload);
      res.json('Email sent');
    }
  });
};

module.exports = sendTasksheet;
