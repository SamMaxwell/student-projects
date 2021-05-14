const router = require('express').Router();
const { getRoutes } = require('../utils');
const homeController = require('../controllers/home-controller');

module.exports = (logger) => {
  router.get('/', homeController.index);
  router.use(getRoutes(logger, __dirname, __filename));
  return router;
};