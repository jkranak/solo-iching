'use strict';

const router = require('express').Router();
const { addResults, checkUser, getUser } = require('./controllers/history');
// const {
//   googleAuthenticate, 
//   googleAuthenticateCB, 
//   twitterAuthenticate,
//   twitterAuthenticateCB,
//   githubAuthenticate,
//   githubAuthenticateCB,
//   logout} = require('./controllers/oauth');

router.post('/addhistory', addResults);
router.post('/checkuser', checkUser);
router.get('/getuser', getUser);

// router.get('/auth/google/callback', googleAuthenticate);
// router.get('/auth/google', googleAuthenticateCB);
// router.get('/auth/twitter/callback', twitterAuthenticate);
// router.get('/auth/twitter', twitterAuthenticateCB);
// router.get('/auth/github/callback', githubAuthenticate);
// router.get('/auth/github', githubAuthenticateCB);
// router.get('/auth/logout', logout);

module.exports = router;