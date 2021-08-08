'use strict';

const router = require('express').Router();
const { addResults, checkUser } = require('./controller');

router.post('/addhistory', addResults);
router.post('/checkuser', checkUser);


module.exports = router;