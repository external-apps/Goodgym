const getRun = require('./getRunFromGoodGym');

const home = (req, res) => {
  const paramId = req.params.id;
  if (paramId !== 'favicon.ico') {
    getRun(paramId, (err, run) => {
      if (err) {
        console.error(err);
        res.render('error', null);
        return;
      }
      res.render('home', run);
    });
  }
};

module.exports = home;
