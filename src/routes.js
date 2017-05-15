const express = require('express');
const router = express.Router();

const home = require('./routes/home');
const qr = require('./routes/qr');
const tasksheet = require('./routes/tasksheet');

router.get('/:id', home);
router.get('/qr/:id', qr);
router.get('/task-sheet/:id', tasksheet);

module.exports = router;
