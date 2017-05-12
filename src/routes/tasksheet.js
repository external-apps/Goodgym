const fs = require('fs');
require('env2')(`${__dirname}/../../.env`);

const YotiClient = require('yoti-node-sdk');
const SDK_ID = process.env.CLIENT_SDK_ID;
const PEM_PATH = `${__dirname}/../keys/GoodGym-access-security.pem`;
const PEM = fs.readFileSync(PEM_PATH);

let yotiClient = new YotiClient(SDK_ID, PEM);

const tasksheet = (req, res) => {
  let token = req.query.token;
  if (!token) {
    return res.send('No token found');
  }
  yotiClient.getActivityDetails(token).then((activityDetails) => {
    const user = {
      userId: activityDetails.getUserId(),
      profile: activityDetails.getUserProfile(),
      outcome: activityDetails.getOutcome()
    };
    res.render('task-sheet', {
      user: user.profile.givenNames
    });
  }).catch((err) => {
    console.error(err);
  });
  console.log(token);
};

module.exports = tasksheet;
