const findOneRun = require('./../database/db-find-one');

const getRun = (req, res) => {
  const runId = req.params.id;
  findOneRun(runId, (err, run) => {
    if (err) {
      res.status(400).json({ error: `No run found for ID: ${runId}` });
      return;
    }
    res.json(run);
  });
};

module.exports = getRun;
