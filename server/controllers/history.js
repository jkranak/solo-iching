'use strict';

const models = require('../models/index');

exports.addResults = (req, res) => {
  try {
    models.addResults(req.body.id, req.body.history);
    res.status(204);
  } catch (err) {
    console.log(err);
    res.status(500)
  }
}

exports.checkUser = async (req, res) => {
  try {
    const userRes = await models.checkUser(req.body.user);
    if (userRes.rowCount > 0) {
      for (let el of userRes.rows) {
        if (el.source === req.body.user.source) {
          const allHistory = await models.getHistory(req.body.user);
          const resultArr = [...req.body.history];
          for (let res of allHistory.rows) {
            const result = {};
            result.question = res.question;
            result.method = res.method;
            let divinationArr = res.divination.split(',')
            result.divination = divinationArr;
            let numbersArr = res.numbers.split(',');
            result.numbers = numbersArr;
            let linesArr = [];
            if (res.lines.length) linesArr = res.lines.split(',');
            result.lines = linesArr;
            resultArr.push(result);
          }
          models.addResults(req.body.user.id, req.body.history);
          res.send(resultArr);
          res.status(200).end();
          return;
        }
      }
    }
    models.addUser(req.body.user);
    models.addResults(req.body.user.id, req.body.history);
    res.send(req.body.history);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

exports.getUser = (req, res) => {
  res.send(req.user);
}
