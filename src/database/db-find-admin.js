const { Admin } = require('./db-connection');

Admin.findOne({username: 'admin1', password: 'admin123'}, (err, admin) => {
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
