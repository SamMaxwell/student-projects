const Sequelize = require('sequelize');

const {
  JAWSDB_URL,
  DB_NAME: database,
  DB_USER: username,
  DB_PW: password,
  DB_HOST: host = 'localhost',
  DB_DIALECT: dialect = 'mysql',
  DB_PORT: port = 3306,
} = process.env;

const isJaws = JAWSDB_URL > '';

const args = isJaws
  ? [JAWSDB_URL]
  : [database, username, password, { host, dialect, port }];

const db = new Sequelize(...args);

module.exports = db;
