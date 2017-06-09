const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('./helpers/auth-middleware');

const login = require('./routes/login');
const confirmation = require('./routes/confirmation');
const home = require('./routes/home');
const enterRun = require('./routes/enter-run');
const qr = require('./routes/qr');
const tasksheet = require('./routes/tasksheet');
const getRun = require('./routes/get-run');
const postRun = require('./routes/post-run');
const sendEmail = require('./routes/send-qr-email');
const sendTaskSheet = require('./routes/send-task-sheet');

router.get('/', login);
router.get('/login', login);
router.get('/run', authMiddleware, enterRun);
router.get('/logout', (req, res) => {
  console.log('Logout!');
  req.logout();
  res.redirect('/login');
});
router.get('/confirmation', confirmation);
router.get('/:id', authMiddleware, home);
router.get('/qr/:id', authMiddleware, qr);
router.get('/task-sheet/:id', tasksheet);
router.get('/get-run/:id', getRun);
router.post('/post-run/:id', postRun);
router.post('/send-qr-email/:id', sendEmail);
router.post('/send-task-sheet', sendTaskSheet);
router.post('/login',
passport.authenticate('local', {successReturnToOrRedirect: '/run', failureRedirect: '/login'}));

module.exports = router;
