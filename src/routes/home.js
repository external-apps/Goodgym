require('env2')(`${__dirname}/../../.env`);
const apiKey = process.env.API_KEY;
const getRun = require('./getRunFromGoodGym');

const home = (req, res) => {
  res.render('home', {
    apiKey: apiKey
  });

  const paramId = req.params.id;
  if (paramId !== 'favicon.ico') {
    getRun(paramId, (err, run) => {
      if (err) console.error(err);
      res.render('home', run);
    });
  }
};

module.exports = home;
