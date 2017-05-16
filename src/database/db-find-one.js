const GoodGymDB = require('./db-connection');

const findOneRun = (runId) => {
  GoodGymDB.find({'run.runId': runId}, (err, run) => {
    if (err) throw err;
    console.log(run);
  });
};

findOneRun('p');

module.exports = findOneRun;
