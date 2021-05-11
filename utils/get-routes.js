const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const getRoutes = (logger, directory, self) => {
  logger.info(`getRoutes: reading directory ${directory}`);
  const entries = fs.readdirSync(directory);
  entries.forEach((name) => {
    const { base } = path.parse(self);
    if (name === base) return;
    logger.info(`getRoutes: loading module ${name}`);
    const route = `/${name}`;
    // eslint-disable-next-line import/no-dynamic-require, global-require
    router.use(route, require(path.join(directory, route))(logger));
  });

  return router;
};

module.exports = getRoutes;
