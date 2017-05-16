const GoodGymDB = require('./db-connection');
const findOneRun = require('./db-find-one');

const addRunToDB = (inputRun, cb) => {
  let newRun = GoodGymDB({
    run: inputRun
  });

  const saveRun = () => {
    newRun.save((err) => {
      if (err) {
        return cb(err);
      }
      console.log('Run created!');
      return cb(null, inputRun);
    });
  };

  findOneRun(inputRun.runId, (err, res) => {
    if (err) throw err;
    if (res.length > 0) {
      console.log('duplicate');
    } else {
      console.log('not duplicate');
      saveRun();
    }
  });
};

module.exports = addRunToDB;
