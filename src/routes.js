const express = require('express');
const router = express.Router();

const login = require('./routes/login');
const home = require('./routes/home');
const qr = require('./routes/qr');
const tasksheet = require('./routes/tasksheet');
const postRun = require('./routes/post-run');

router.get('/login', login);
router.get('/:id', home);
router.get('/qr/:id', qr);
router.get('/task-sheet/:id', tasksheet);
router.post('/post-run/:id', postRun);
module.exports = router;
