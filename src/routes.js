const express = require('express');
const router = express.Router();

const login = require('./routes/login');
const home = require('./routes/home');
const qr = require('./routes/qr');
const tasksheet = require('./routes/tasksheet');
const getRun = require('./routes/get-run');
const postRun = require('./routes/post-run');
const sendEmail = require('./routes/send-email.js');

router.get('/login', login);
router.get('/:id', home);
router.get('/qr/:id', qr);
router.get('/task-sheet/:id', tasksheet);
router.get('/get-run/:id', getRun);
router.post('/post-run/:id', postRun);
router.post('/send-email/:id', sendEmail);

module.exports = router;
