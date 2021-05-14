require('dotenv').config();
const pino = require('pino-http')();
const db = require('./config/db');
const { User } = require('./models');

db
  .sync({ force: true })
  .then(() => User
    .bulkCreate([{
      name: 'Sam Maxwell',
      password: 'Password 1!',
      isAdmin: true,
      isEnabled: true,
    }, {
      name: 'Samuel Maddox',
      password: 'Password 1!',
      isAdmin: true,
      isEnabled: true,
    }, {
      name: 'Guillermo Barila',
      password: 'Password 1!',
      isAdmin: true,
      isEnabled: true,
    }, {
      name: 'Esar Behlum',
      password: 'Password 1!',
      isAdmin: true,
      isEnabled: true,
    }, {
      name: 'Harsh Patel',
      password: 'Password 1!',
      isAdmin: true,
      isEnabled: true,
    }, {
      name: 'Eli Vargas',
      password: 'Password 1!',
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
