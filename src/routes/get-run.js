const findOneRun = require('./../database/db-find-one');

const getRun = (req, res) => {
  const runId = req.params.id;
  findOneRun(runId, (err, run) => {
    if (err) {
      console.log(err);
    } else {
      res.json(run);
    }
  });
};

module.exports = getRun;
