const routes = require('express').Router();
const Users = require('../controllers/Users');
const auth = require('../middlewares/auth');

routes.post('/users', Users.create);

module.exports = routes;
