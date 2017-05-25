const express = require('express');
const router = express.Router();

const login = require('./routes/login');
const home = require('./routes/home');
const qr = require('./routes/qr');
const tasksheet = require('./routes/tasksheet');
const getRun = require('./routes/get-run');
const postRun = require('./routes/post-run');
const sendEmail = require('./routes/send-email');
const confirmation = require('./routes/confirmation');
const sendTaskSheet = require('./routes/send-task-sheet');

router.get('/login', login);
router.get('/:id', home);
router.get('/qr/:id', qr);
router.get('/task-sheet/:id', tasksheet);
router.get('/get-run/:id', getRun);
router.get('/confirmation/:id', confirmation);
router.post('/post-run/:id', postRun);
router.post('/send-email/:id', sendEmail);
router.post('/send-task-sheet/:id', sendTaskSheet);

module.exports = router;
