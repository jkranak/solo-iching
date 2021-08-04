'use strict';
const models = require('./models/index');

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
    const userRes = await models.checkUser(req.body);
    if (userRes.rowCount === 0) {
      models.addUser(req.body);
      res.send([]);
      res.status(200);
    } else {
      for (let el of userRes.rows) {
        if (el.source === req.body.source) {
          const allHistory = await models.getHistory(req.body);
          const resultArr = [];
          for (let res of allHistory.rows) {
            const result = {};
            result.question = res.question;
            result.method = res.method;
            let divinationArr = [];
            res.divination.split(',').forEach(num => {
              divinationArr.push(Number(num));
            });
            result.divination = divinationArr;
            let numbersArr = [];
            res.numbers.split(',').forEach(num => {
              numbersArr.push(Number(num));
            });
            result.numbers = numbersArr;
            let linesArr = [];
            if (res.lines.length) {
              res.lines.split(',').forEach(num => {
                linesArr.push(Number(num));
              });
            }
            result.lines = linesArr;
            resultArr.push(result);
          }
          res.send(resultArr);
          res.status(200);
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}