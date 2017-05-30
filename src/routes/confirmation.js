require('env2')(`${__dirname}/../../.env`);

const YotiClient = require('yoti-node-sdk');
const SDK_ID = process.env.CLIENT_SDK_ID;
const PEM = process.env.SECURITY_PEM;

let yotiClient = new YotiClient(SDK_ID, PEM);

if (!SDK_ID) {
  console.log('Enviroment variable CLIENT_SDK_ID must be set.');
}

const confirmation = (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.render('error', { error: 'No yoti token provided' });
    return;
  }
  yotiClient.getActivityDetails(token).then((activityDetails) => {
    const userProfile = activityDetails.getUserProfile();
    res.render('confirmation', {
      firstName: capitalise(userProfile.givenNames.split(' ')[0]),
      lastName: capitalise(userProfile.familyName),
      emailAddress: userProfile.emailAddress
    });
  }).catch((err) => {
    res.render('error', { error: err });
  });
};

const capitalise = (text) => {
  return text.slice(0, 1) + text.slice(1).toLowerCase();
};

module.exports = confirmation;
