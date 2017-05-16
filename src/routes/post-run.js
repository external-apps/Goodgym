const addToDatabase = require('../database/db-add-run');
console.log(addToDatabase);

const postRun = (req, res) => {
  var body = req.body;
  addToDatabase(body, function (err, body) {
    if (err) {
      console.log(err);
      res.send('POST request not made!');
    } else {
      console.log('body:', body);
      res.send('run added to database');
    }
  });
};

module.exports = postRun;
