const { Admin } = require('./db-connection');

Admin.findOne({username: 'admin', password: 'admin123'}, (err, admin) => {
  if (err) {
    console.log(err);
    // return res.status(500).send();
  }

  if (!admin) {
    console.log('There is no admin');
    // return res.status(404).send();
  }
  console.log(admin, 'admin');
  // req.session.admin = admin;
  // return res.status(200).send();
});
