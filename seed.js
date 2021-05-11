require('dotenv').config();
const pino = require('pino-http')();
const db = require('./config/db');
const { User } = require('./models');

db
  .sync({ force: true })
  .then(() => User
    .bulkCreate([{
      name: 'Sam Maxwell',
      password: 'S1m52lPr4j2cts!',
    }, {
      name: 'Samuel Maddox',
      password: 'Casino Royale 2006!',
      isAdmin: true,
      isEnabled: true,
    }, {
      name: 'Guillermo Barila',
      password: 'Quantum of Solace 2008!',
      isAdmin: true,
      isEnabled: true,
    }, {
      name: 'Esar Behlum',
      password: 'Skyfall 2012!',
      isAdmin: true,
      isEnabled: true,
    }, {
      name: 'Harsh Patel',
      password: 'Spectre 2015!',
      isAdmin: true,
      isEnabled: true,
    }, {
      name: 'Eli Vargas',
      password: 'No Time to Die 2021!',
      isAdmin: true,
      isEnabled: true,
    }], {
      individualHooks: true,
      returning: true,
    })
    .catch(({ message }) => pino.logger.error(`User.bulkCreate: ${message}`)))
  .then(() => {
    pino.logger.info('db seeded!');
    process.exit(0);
  })
  .catch(({ message } = {}) => pino.logger.error(`db.sync: ${message}`));
