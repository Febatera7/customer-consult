const routes = require('express').Router();
const session = require('./session');
const users = require('./users');
const customers = require('./customers');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../swagger-output.json');
const options = {
    swaggerOptions: {
      authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
    }
  };

routes.get('/', (req, res) => res.status(401).send({ message: 'Unauthorized' }));
routes.put('/', (req, res) => res.status(401).send({ message: 'Unauthorized' }));
routes.post('/', (req, res) => res.status(401).send({ message: 'Unauthorized' }));
routes.delete('/', (req, res) => res.status(401).send({ message: 'Unauthorized' }));

routes.use(session);
routes.use(users);
routes.use(customers);
routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// routes.get('/docs', swaggerUi.setup(swaggerDocument));

module.exports = routes;
