'use strict';

const { Pool } = require('pg')
const pool = new Pool({
  host: 'localhost',
  user: 'josephkranak',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

const connectString = process.env.DATABASE;

function getHistory (user) {
  return pool
    .query(`SELECT * from results WHERE userid = '${user.id}'`).
    catch(err => setImmediate(() => {throw err}));
}

function addUser (user) {
  const text = 'INSERT INTO users("id", "name", "source") VALUES($1, $2, $3);';
  const values = [user.id, user.name, user.source];
  pool
    .query(text, values)
    .catch(err => console.error(err.stack));
}

function addResults (id, history) {
  letOutputArr = [];
  for (let i = 0; i < history.length; i++) {
    const text = 'INSERT INTO results("userid", "question", "divination", "numbers", "lines", "method") VALUES($1, $2, $3, $4, $5, $6);';
    const values = [id, history[i].question, history[i].divination.join(','), history[i].numbers.join(','), history[i].lines.join(','), history[i].method]
    pool
    .query(text, values)
    .catch(err => console.error(err.stack));
  }
}

async function checkUser (user) {
  const res = await pool.query(`SELECT * from users WHERE id = '${user}'`);
  return res.rows;
}


module.exports = {
  getHistory, 
  addUser,
  addResults,
  checkUser
};