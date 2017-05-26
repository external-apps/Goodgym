const getRun = require('./getRunFromGoodGym');

const taskSheet = (req, res) => {
  const paramId = req.params.id;
  if (paramId !== 'favicon.ico') {
    getRun(paramId, (err, run) => {
      if (err) { throw new Error(err); }
      res.render('task-sheet', run);
    });
  }
};

module.exports = taskSheet;
