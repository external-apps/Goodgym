const getRun = require('../helpers/get-run-from-goodgym.js');

const home = (req, res) => {
  const paramId = req.params.id;
  if (paramId !== 'favicon.ico') {
    getRun(paramId, (err, run) => {
      console.log(run, 'run from home.js');
      if (err) {
        console.error(err);
        res.render('error', { error: 'No run found in our database!' });
        return;
      }
      res.render('home', {
        run: run,
        scripts: [
          '/scripts/index.js',
          '/scripts/home.js',
          'anime.min.js'
        ]
      });
    });
  }
};

module.exports = home;
