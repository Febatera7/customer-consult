const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./app/routes');
require('./app/database/connection');

class App {
    constructor() {
        this.server = express();
        this.server.use(cors());
        this.middlewares();
        this.routes();
    };

    middlewares() {
        this.server.use(express.json());
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: false}));
    };

    routes() {
        this.server.use(routes);
    };
};

module.exports = new App().server;
