const findOneRun = require('./../database/db-find-one');

const getRun = (req, res) => {
  const runId = req.params.id;
  findOneRun(runId, (err, run) => {
    if (err) {
      console.error(err);
      res.render('error', null);
      return;
    }
    res.json(run);
  });
};

module.exports = getRun;
