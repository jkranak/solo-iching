const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const models = require('../models/index')

// passport.serializeUser((user, done) => {
//   return done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   models.checkUser(id, (err, userObj) => {
//     done(null, userObj)
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
  }
));

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

module.exports = passport