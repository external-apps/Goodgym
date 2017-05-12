const fs = require('fs');
require('env2')(`${__dirname}/../../.env`);

const YotiClient = require('yoti-node-sdk');
const SDK_ID = process.env.CLIENT_SDK_ID;
const PEM_PATH = `${__dirname}/../keys/GoodGym-access-security.pem`;
const PEM = fs.readFileSync(PEM_PATH);

let yotiClient = new YotiClient(SDK_ID, PEM);

const qr = (req, res) => {
  let token = req.query.token;
  if (!token) {
    res.render('home', {
      error: 'No token has been provided.'
    });
    return;
  }
  let promise = yotiClient.getActivityDetails(token).then((activityDetails) => {
    res.render('task-sheet', {
      userId: activityDetails.getUserId(),
      profile: activityDetails.getUserProfile(),
      outcome: activityDetails.getOutcome()
    });
  }).catch((err) => {
    console.error(err);
  });
  console.log(token);
  res.render('qr');
};

module.exports = qr;

// const qr = (req, res) => {
//   res.render('qr');
// };
//
// module.exports = qr;
