const fs = require('fs');
require('env2')(`${__dirname}/../../.env`);

const YotiClient = require('yoti-node-sdk');
const SDK_ID = process.env.CLIENT_SDK_ID;
const PEM_PATH = `${__dirname}/../keys/GoodGym-access-security.pem`;
const PEM = fs.readFileSync(PEM_PATH);

let yotiClient = new YotiClient(SDK_ID, PEM);

const tasksheet = (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.status(500).send('No yoti token provided');
    return;
  }
  yotiClient.getActivityDetails(token).then((activityDetails) => {
    const userProfile = activityDetails.getUserProfile();
    res.render('task-sheet', {
      firstName: userProfile.givenNames,
      lastName: userProfile.familyName
    });
  }).catch((err) => {
    console.error(err);
  });
  console.log(token);
};

module.exports = tasksheet;
