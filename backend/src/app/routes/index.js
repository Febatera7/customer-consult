const routes = require('express').Router();
const session = require('./session');
const users = require('./users');
const customers = require('./customers');

routes.get('/', (req, res) => res.status(401).send({ message: 'Unauthorized' }));
routes.put('/', (req, res) => res.status(401).send({ message: 'Unauthorized' }));
routes.post('/', (req, res) => res.status(401).send({ message: 'Unauthorized' }));
routes.delete('/', (req, res) => res.status(401).send({ message: 'Unauthorized' }));

routes.use(session);
routes.use(users);
routes.use(customers);

module.exports = routes;
