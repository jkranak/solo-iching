'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router')

const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github2');

const PORT = process.env.PORT || 3002;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true}));
app.use(router);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
})

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

  app.get('/checkuser', (req, res) => {
    res.send(req.user);
  })

  app.delete('/logout', (req, res) => {
    req.session.destroy(function() {
      res.clearCookie('connect.sid', { path: '/' });
  });
    return res.status(204);
  })

  app.listen(PORT, () => {
    console.log(`Server listening at localhost:${PORT}`)
  });