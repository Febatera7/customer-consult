const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const authConfig = require('../config/auth');
const cache = require('memory-cache');

class SessionController {
    async create(req, res) {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email });

            if (!user) {
                throw new Error('Invalid email and/or password');
            }

            if (!(await bcrypt.compare(password, user.password))) {
                throw new Error('Invalid email and/or password');
            }

            const token = jwt.sign({ id: user._id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            });

            cache.put(email, token);

            res.status(200).send({
                name: user.name,
                email,
                token
            });

        } catch (err) {
            console.error(err.message);
            res.status(400).send({ error: err.message });
        }
    };
};

module.exports = new SessionController();
