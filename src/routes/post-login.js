const { Admin } = require('../database/db-connection');

const postLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.session, 'req.session');
  Admin.findOne({username: username, password: password}, (err, admin) => {
    if (err) {
      return console.log(err);
      // return res.status(500).send();
    }

    if (!admin) {
      return console.log('There is no admin');
      // return res.status(404).send();
    }
    return console.log(admin, 'admin');
    // req.session.admin = admin;
    // return res.status(200).send();
  });
};

module.exports = postLogin;
