const GoodGymDB = require('./db-connection');

const findAll = () => {
  GoodGymDB.find({}, function (err, users) {
    if (err) throw err;
    console.log(users);
  });
};

findAll();

module.exports = findAll;
