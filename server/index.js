'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const store = new pgSession();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github2');
const models = require('./models/index');

const PORT = process.env.PORT || 3002;

app.use(session({
  store: store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 24 * 60 * 60 * 1000 },
  conString: process.env.DATABASE,
  sameSite: true,
  // secure: true - requires https
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true}));
app.use(router);

// passport.serializeUser((user, done) => {
//   return done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   models.checkUser(id, (err, userObj) => {
//     if (err) console.log(err)
//     else return done(null, userObj)
//   })
// })

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  const userObj = {
    id: profile.id,
    name: profile.displayName,
    source: 'google'
  }
  cb(null, userObj);
  }));

  app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL}),
    function (req, res) {
      res.redirect(process.env.CLIENT_URL);
  });

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_ID,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: "/auth/twiter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    const userObj = {
      id: profile.id,
      name: profile.displayName,
      source: 'twitter'
    }
    cb(null, userObj);
  }
));

app.get('/auth/twiter',
  passport.authenticate('twitter'));

app.get('/auth/twiter/callback', 
  passport.authenticate('twitter', { failureRedirect: process.env.CLIENT_URL }),
  function(req, res) {
    res.redirect(process.env.CLIENT_URL);
  });

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: "/auth/github/callback"
},
  function(accessToken, refreshToken, profile, cb) {
    const userObj = {
      id: profile.id,
      name: profile.displayName,
      source: 'github'
    }
    cb(null, userObj);
  }
));

app.get('/auth/github',
passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
passport.authenticate('github', { failureRedirect: process.env.CLIENT_URL }),
function(req, res) {
  res.redirect(process.env.CLIENT_URL);
});

app.get('/getuser', (req, res) => {
  res.send(req.user);
})

app.get('/auth/logout', function(req, res) {
  if (req.user) {
    req.logout();
    res.send('done');
  };
})

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`)
});