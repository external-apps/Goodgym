const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');
const routes = require('./routes');
const app = express();

const hbs = exphbs.create({
  defaultLayout: path.join(__dirname, '/templates/layout/main.hbs')
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/templates/views'));

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'shhsecret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use('/', routes);

module.exports = app;
