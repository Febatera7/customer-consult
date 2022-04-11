const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/auth');
const cache = require('memory-cache');
const Users = require('../models/Users');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new Error('Unauthorized');
        }

        const [, token] = authHeader.split(' ');

        if (!token) {
            throw new Error('Unauthorized');
        }

        const user = await Users.findOne({ email: req.headers.email });

        if (!user) {
            throw new Error('User not find');
        }

        const verifiedUserToken = cache.get(req.headers.email);

        if (!verifiedUserToken) {
            throw new Error('Please, login');
        }

        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        if (!decoded) {
            throw new Error('Session expired, please, login again');
        }

        req.userId = decoded.id;

        return next();
    } catch (err) {
        res.status(401).send({ error: err.message });
    }
};
