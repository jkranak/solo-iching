'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const cors = require('cors');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const router = require('./router');

const PORT = process.env.PORT || 3002;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT, credentials: true}));

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
})

app.use(router);

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  cb(null, profile);
  }));

  app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/'}),
    function (req, res) {
      res.redirect(process.env.CLIENT);
  });

  app.get('/getuser', (req, res) => {
    res.send(req.user);
  })

  app.listen(PORT, () => {
    console.log(`Server listening at localhost:${PORT}`)
  });
  