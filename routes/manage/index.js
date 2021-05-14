const routes = require('express').Router();
const mustBeLoggedIn = require('../../middleware/auth/must-be-logged-in');
const mustBeAdmin = require('../../middleware/auth/must-be-admin');
const manageController = require('../../controllers/manage-controller');

routes.get('/', mustBeLoggedIn, mustBeAdmin, manageController.manageUsers);
routes.put('/enable', mustBeLoggedIn, mustBeAdmin, manageController.enableUser);
routes.put('/disable', mustBeLoggedIn, mustBeAdmin, manageController.disableUser);
routes.delete('/delete', mustBeLoggedIn, mustBeAdmin, manageController.deleteUser);

module.exports = () => routes;
