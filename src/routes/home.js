const apiKey = process.env.API_KEY;
const getRun = require('../helpers/get-run-from-goodgym');

const home = (req, res) => {
  const paramId = req.params.id;
  if (paramId !== 'favicon.ico') {
    getRun(paramId, (err, run) => {
      if (err) {
        console.error(err);
        res.render('error', { error: 'No run found in our database!' });
        return;
      }
      res.render('home', {
        run: run,
        location: run.data.location,
        destination: run.data.toLocation[0],
        apiKey: apiKey,
        user: req.user,
        scripts: [
          '/scripts/google-maps.js',
          '/scripts/home.js',
          '/scripts/index.js',
          'anime.min.js',
          '/scripts/yoti-init.js'
        ]
      });
    });
  }
};

module.exports = home;
