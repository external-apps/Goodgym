require('env2')(`${__dirname}/../.env`);
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { getUserByUsername, getUserById } = require('./helpers/admin-queries');
const path = require('path');
const routes = require('./routes');
let app = express();

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

passport.use(new LocalStrategy(
(username, password, done) => {
  getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) return done(null, false);
    if (password !== user.password) return done(null, false);
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  getUserById(id, (err, user) => {
    done(err, user);
  });
});

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(express.static('public'));
app.use('/', routes);

module.exports = app;
