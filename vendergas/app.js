
var express = require('express');
var app = express();
const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});
// NOTE: Testa a conexão
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res) 
  pool.end() 
});

module.exports = app;
