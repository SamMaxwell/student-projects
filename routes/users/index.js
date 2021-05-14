const routes = require('express').Router();
const mustBeLoggedIn = require('../../middleware/auth/must-be-logged-in');
const usersController = require('../../controllers/users-controller');

routes.get('/my-profile', mustBeLoggedIn, usersController.myProfileGet);
routes.post('/my-profile', mustBeLoggedIn, usersController.myProfilePost);
routes.get('/:id', mustBeLoggedIn, usersController.userGet);

module.exports = () => routes;