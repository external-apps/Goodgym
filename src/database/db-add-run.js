const GoodGymDB = require('./db-connection');

const addRunToDB = (inputRun, cb) => {
  let newRun = GoodGymDB({
    run: inputRun
  });

  newRun.save((err) => {
    if (err) {
      return cb(err);
    }
    console.log('Run created!');
    return cb(null, inputRun);
  });
};

module.exports = addRunToDB;
