const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const crypto = require('crypto');

class UsersController {
    async create(req, res) {
        try {
            const { name, email, password } = req.body;

            const emailExist = await Users.findOne({ email });

            if (emailExist) {
                throw new Error('E-mail already exists.');
            }

            const hashPassword = await bcrypt.hash(password, 8);

            const _id = await crypto.randomBytes(4).toString('HEX');

            await Users.create({
                _id,
                name,
                email,
                password: hashPassword
            });

            res.status(201).send({ message: 'User created successfully, please login on app' });
        } catch (err) {
            res.status(400).send({ message: err.message });
        }
    };

};

module.exports = new UsersController();
