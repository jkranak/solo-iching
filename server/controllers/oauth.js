'use strict';

const passport = require('./passport');

const failureRedirect = process.env.CLIENT_URL

exports.googleAuthenticate = () => {
  console.log('8')
  passport.authenticate('google', {
    scope: ['profile']
  })
}

exports.googleAuthenticateCB = () => {
  passport.authenticate('google', { failureRedirect }),
    function (req, res) {
      console.log(req, res)
      res.redirect(failureRedirect);
    }
}

exports.twitterAuthenticate = () => {
  console.log('21')
  passport.authenticate('twitter')
}

exports.twitterAuthenticateCB = () => {
  passport.authenticate('twitter', { failureRedirect }),
  function(req, res) {
    res.redirect(failureRedirect);
  }
}

exports.githubAuthenticate = () => {
  passport.authenticate('github', { scope: [ 'user:email' ] })
}

exports.githubAuthenticateCB = () => {
  passport.authenticate('github', { failureRedirect }),
  function(req, res) {
    res.redirect(failureRedirect);
  }
}

exports.logout = (req, res) => {
  try {
    if (req.user) {
      req.logout();
      res.send('done');
    };
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}