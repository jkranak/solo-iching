const pg = require('pg');

const connectString = 'postgres://localhost:5432/iching';

function getHistory (user) {
  const pgClient = new pg.Client(connectString);
  pgClient.connect();
  return pgClient
    .query(`SELECT * from results WHERE userid = '${user.id}'`);
}

function addUser (user) {
  const pgClient = new pg.Client(connectString);
  pgClient.connect();
  const text = 'INSERT INTO users("id", "name", "source") VALUES($1, $2, $3);';
  const values = [user.id, user.name, user.source];
  pgClient
    .query(text, values)
    .catch(err => console.error(err.stack));
}

function addResults (id, history) {
  const pgClient = new pg.Client(connectString);
  pgClient.connect();
  letOutputArr = [];
  for (let i = 0; i < history.length; i++) {
    const text = 'INSERT INTO results("userid", "question", "divination", "numbers", "lines", "method") VALUES($1, $2, $3, $4, $5, $6);';
    const values = [id, history[i].question, history[i].divination.join(','), history[i].numbers.join(','), history[i].lines.join(','), history[i].method]
    pgClient
    .query(text, values)
    .catch(err => console.error(err.stack));
  }
}

async function checkUser (user) {
  const pgClient = new pg.Client(connectString);
  pgClient.connect();
  return pgClient
    .query(`SELECT * from users WHERE id = '${user.id}'`);
}


module.exports = {
  getHistory, 
  addUser,
  addResults,
  checkUser
};