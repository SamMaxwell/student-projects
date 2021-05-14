const routes = require('express').Router();
const mustBeLoggedIn = require('../../middleware/auth/must-be-logged-in');
const mustBeAdmin = require('../../middleware/auth/must-be-admin');
const userController = require('../../controllers/user-controller');

routes.get('/not-is-enabled', mustBeLoggedIn, userController.getNotIsEnabled);

module.exports = () => routes;
