const GoodGymDB = require('./db-connection');

const findOneRun = (runName) => {
  GoodGymDB.findOne({run: runName}, (err, runs) => {
    if (err) throw err;
    console.log(runs);
  });
};

findOneRun('run123');

module.exports = findOneRun;
