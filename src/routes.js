const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { getUserByUsername, getUserById } = require('./models/Admin');
// const checkAuth = require('./helpers/authenticationMiddleware');

const login = require('./routes/login');
const confirmation = require('./routes/confirmation');
const home = require('./routes/home');
const qr = require('./routes/qr');
const tasksheet = require('./routes/tasksheet');
const getRun = require('./routes/get-run');
const postRun = require('./routes/post-run');
const sendEmail = require('./routes/send-qr-email');
const sendTaskSheet = require('./routes/send-task-sheet');

router.get('/', login);
router.get('/login', login);
router.get('/confirmation', confirmation);
router.get('/:id', home);
router.get('/qr/:id', qr);
router.get('/task-sheet/:id', tasksheet);
router.get('/get-run/:id', getRun);
router.post('/post-run/:id', postRun);
router.post('/send-qr-email/:id', sendEmail);
router.post('/send-task-sheet/:id', sendTaskSheet);

passport.use(new LocalStrategy(
  (username, password, done) => {
    getUserByUsername(username, (err, admin) => {
      if (err) throw err;
      if (!admin) return done(null, false);
      if (password !== admin.password) return done(null, false);
      console.log(admin, 'admin - LocalStrategy');
      return done(null, admin);
    });
  }));

passport.serializeUser((admin, done) => {
  console.log(admin.id, 'admin.id - serializeUser');
  done(null, admin.id);
});

passport.deserializeUser((id, done) => {
  getUserById(id, (err, admin) => {
    console.log(id, 'id - deserializeUser');
    console.log(admin, 'admin - deserializeUser');
    done(err, admin);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect: '/home', failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('/home');
  });

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
