const routes = require('express').Router();
const mustBeLoggedIn = require('../../middleware/auth/must-be-logged-in');
const mustBeAdmin = require('../../middleware/auth/must-be-admin');
const usersController = require('../../controllers/users-controller');

routes.get('/my-profile', mustBeLoggedIn, usersController.myProfileGet);
routes.post('/my-profile', mustBeLoggedIn, usersController.myProfilePost);
routes.get('/manage', mustBeLoggedIn, mustBeAdmin, usersController.manageUsers);
routes.get('/:id', mustBeLoggedIn, usersController.userGet);

module.exports = () => routes;
