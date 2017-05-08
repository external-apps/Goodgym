const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');

app.engine('hbs', exphbs({
  defaultLayout: path.join(__dirname, '/views/layouts/main.hbs')
}));

app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('Our app listening on port 3000!');
});
