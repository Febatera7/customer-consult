const routes = require('express').Router();
const Session = require('../controllers/Session');

routes.post('/signin', Session.create);

module.exports = routes;
