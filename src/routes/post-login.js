// const { Admin } = require('../database/db-connection');

const postLogin = (req, res) => {
  // const username = req.body.username;
  // const password = req.body.password;
  // const session = req.session;
  // console.log(req.session, 'req.session');
  // Admin.findOne({username: username, password: password}, (err, admin) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(500).send('POST request not made!');
  //   }
  //
  //   if (!admin) {
  //     console.log('There is no admin');
  //     return res.status(404).send('You need to be logged in to see this page');
  //   }
  //   session.admin = admin;
  //   res.status(200).send('Hello admin!');
  //   next();
  //   // res.redirect('/home');
  // });
};

// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });

module.exports = postLogin;
