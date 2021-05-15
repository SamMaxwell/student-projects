const routes = require('express').Router();
const mustBeLoggedIn = require('../../middleware/auth/must-be-logged-in');
const mustBeAdmin = require('../../middleware/auth/must-be-admin');
const usersController = require('../../controllers/users-controller');

// Profile
routes.get('/my-profile', mustBeLoggedIn, usersController.myProfileGet);
routes.post('/my-profile', mustBeLoggedIn, usersController.myProfilePost);

// Management
routes.get('/manage', mustBeLoggedIn, mustBeAdmin, usersController.getManage);

routes.get('/:id', mustBeLoggedIn, usersController.userGet);
routes.put('/:id', mustBeLoggedIn, mustBeAdmin, usersController.putUser);
routes.delete('/:id', mustBeLoggedIn, mustBeAdmin, usersController.deleteUser);

module.exports = () => routes;
