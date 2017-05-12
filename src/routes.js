const express = require('express');
const router = express.Router();

const home = require('./routes/home');
const qr = require('./routes/qr');
const tasksheet = require('./routes/tasksheet');
const qrMaker = require('./routes/qr-maker');

router.get('/:id', home);
router.get('/qr/:id', qr);
router.get('/task-sheet/:id', tasksheet);
router.get('/qr-maker/:id', qrMaker);

module.exports = router;
