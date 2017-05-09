const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes');
const app = express();

const hbs = exphbs.create({
  defaultLayout: path.join(__dirname, '/templates/layout/main.hbs')
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/templates/views'));

app.use('/', routes);

if (!module.parent) {
  app.listen(3000, () => {
    console.log('Our app listening on port 3000!');
  });
}

module.exports = app;
