'use strict';
const models = require('./models/index');

exports.addResults = (req, res) => {
  try {
    models.addResults(req.body);
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
          res.send(allHistory.rows);
          res.status(200);
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}