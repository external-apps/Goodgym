const findOneRun = require('./../database/db-find-one');

const getRun = (req, res) => {
  const runId = req.params.id;
  findOneRun(runId, (err, run) => {
    if (err) {
      res.render('error', { error: 'No run found in our database!' });
      return;
    }
    res.json(run);
  });
};

module.exports = getRun;
