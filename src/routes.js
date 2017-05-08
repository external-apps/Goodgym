const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/qr', (req, res) => {
  res.render('qr');
});

router.get('/task-sheet', (req, res) => {
  res.render('task-sheet');
});

module.exports = router;
