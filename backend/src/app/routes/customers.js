const routes = require('express').Router();
const Customers = require('../controllers/Customers');
const auth = require('../middlewares/auth');

routes.post('/customers/read', auth, Customers.read);
routes.post('/customers', auth, Customers.create);
routes.patch('/customers/:customerid', auth, Customers.update);
routes.delete('/customers/:customerid', auth, Customers.delete);

module.exports = routes;
