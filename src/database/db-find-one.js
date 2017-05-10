const GoodGymDB = require('./db-connection');

const findOneRun = (runName) => {
  GoodGymDB.findOne({run: runName}, (err, run) => {
    if (err) throw err;
    console.log(run);
  });
};

findOneRun('run123');

module.exports = findOneRun;
