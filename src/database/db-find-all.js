const GoodGymDB = require('./db-connection');

const findAll = () => {
  GoodGymDB.find({}, (err, runs) => {
    if (err) throw err;
    console.log(runs);
  });
};

findAll();

module.exports = findAll;
