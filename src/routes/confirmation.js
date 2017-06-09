const SDK_ID = process.env.CLIENT_SDK_ID;
const PEM = process.env.SECURITY_PEM;

if (!SDK_ID) {
  throw new Error('Enviroment variable CLIENT_SDK_ID must be set.');
}

const addRunToDB = require('../database/db-add-run');

const YotiClient = require('yoti-node-sdk');
let yotiClient = new YotiClient(SDK_ID, PEM);

const confirmation = (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.render('error', { error: 'No yoti token provided' });
    return;
  }
  yotiClient.getActivityDetails(token).then((activityDetails) => {
    const userProfile = activityDetails.getUserProfile();
    const firstName = capitalise(userProfile.givenNames.split(' ')[0]);
    const lastName = capitalise(userProfile.familyName);
    addRunToDB({
      runners: `${firstName} ${lastName}`
    });
    res.render('confirmation', {
      firstName: firstName,
      lastName: lastName,
      emailAddress: userProfile.emailAddress,
      user: req.user,
      scripts: [
        '/scripts/index.js',
        '/scripts/confirmation.js'
      ]
    });
  }).catch((err) => {
    res.render('error', { error: err });
  });
};

const capitalise = (text) => {
  return text.slice(0, 1) + text.slice(1).toLowerCase();
};

module.exports = confirmation;
