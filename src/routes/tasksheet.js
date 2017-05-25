const getRun = require('./getRunFromGoodGym');

const taskSheet = (req, res) => {
  const paramId = req.params.id;
  if (paramId !== 'favicon.ico') {
    getRun(paramId, (err, run) => {
      if (err) console.error(err);
      res.render('task-sheet', run);
    });
  }
};

module.exports = taskSheet;
