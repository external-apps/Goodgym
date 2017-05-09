const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.render('home');
});

router.get('/qr/:id', (req, res) => {
  res.render('qr');
});

router.get('/task-sheet/:id', (req, res) => {
  res.render('task-sheet');
});

module.exports = router;
