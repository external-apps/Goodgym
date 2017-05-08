const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');

app.engine('hbs', exphbs({
  defaultLayout: path.join(__dirname, '/templates/layout/main.hbs')
}));

app.set('views', path.join(__dirname, '/templates/views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/qr', (req, res) => {
  res.render('qr');
});

app.get('/task-sheet', (req, res) => {
  res.render('task-sheet');
});

app.listen(3000, () => {
  console.log('Our app listening on port 3000!');
});
