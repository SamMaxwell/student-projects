const path = require('path');
const express = require('express');
const pino = require('pino-http')();
const session = require('express-session');
const exphbs = require('express-handlebars');

require('dotenv').config();

const app = express();
app.use(pino);

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./config/db');

const { SESSION_COOKIE_SECRET: secret } = process.env;
app.use(session({
  secret,
  cookie: { sameSite: true, secure: 'auto' },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db }),
}));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes')(pino.logger));

db
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 3001;

    app.listen(PORT, ({ message } = {}) => {
      if (message) {
        pino.logger.error(`app.listen error: ${message}`);
      } else {
        pino.logger.info(`App listening on port ${PORT}!`);
      }
    });
  })
  .catch(({ message } = {}) => {
    pino.logger.error(`db.sync error: ${message}`);
  });
