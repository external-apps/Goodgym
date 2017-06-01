const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkAuth = require('./helpers/authenticationMiddleware');

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
router.get('/login', login)
      .post('/login',
passport.authenticate('local', {successRedirect: '/admin', failureRedirect: '/login'}));
router.get('/admin', checkAuth, (req, res) => {
  res.render('home');
});

router.get('/logout', (req, res) => {
  console.log('Logout!');
  req.logout();
  res.redirect('/login');
});
router.get('/confirmation', confirmation);
router.get('/:id', checkAuth, home);
router.get('/qr/:id', checkAuth, qr);
router.get('/task-sheet/:id', tasksheet);
router.get('/get-run/:id', getRun);
router.post('/post-run/:id', postRun);
router.post('/send-qr-email/:id', sendEmail);
router.post('/send-task-sheet/:id', sendTaskSheet);

module.exports = router;
