require('dotenv/config');
const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connection();
    };

    connection() {
        mongoose.connect(process.env.DB_HOST).then(conn => {
            console.info(`Mongo database connected`);
        }).catch(err => {
            console.error(`Error: ${err}`);
        });
    }
};

module.exports = new Database();