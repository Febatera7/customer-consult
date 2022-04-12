const Customers = require('../models/Customers');
const crypto = require('crypto');

class CustomersController {
    async create(req, res) {
        try {
            const {
                name,
                cpf_or_cnpj,
                phone_number,
                contract_date,
                contract_value,
            } = req.body;

            let legal_person;

            if (cpf_or_cnpj.length === 11) {
                legal_person = false;
            } else if (cpf_or_cnpj.length === 14) {
                legal_person = true;
            } else {
                throw new Error('CPF or CNPJ with invalid numbers');
            }

            const contractDateSplit = contract_date.split('/');

            const contractDateParse = new Date(
                contractDateSplit[2],
                contractDateSplit[1] - 1,
                contractDateSplit[0],
                23,
                59,
                59
            );
            const contract_situation = contractDateParse >= new Date() ? 'Dentro do Prazo' : 'Em Atraso';

            const _id = await crypto.randomBytes(4).toString('HEX');

            await Customers.create({
                _id,
                name,
                cpf_or_cnpj,
                legal_person,
                phone_number,
                contract_date: contractDateParse,
                contract_value,
                contract_situation,
                action: 'Nenhuma',
                administrator: req.userId,
            });

            res.status(201).send({ message: 'Customer created successfully' });
        } catch (err) {
            res.status(400).send({ message: err.message });
        }
    };

    async read(req, res) {
        try {
            const filters = req.body;

            const customers = await Customers.find({ administrator: req.userId, ...filters });

            res.status(200).send(customers);
        } catch (err) {
            res.status(400).send({ message: err.message });
        }
    };

    async update(req, res) {
        try {
            const { customerid } = req.params;
            const updateData = req.body;

            const customer = await Customers.findById(customerid);

            if (!customer) {
                throw new Error('Customer not found');
            };

            await Customers.findByIdAndUpdate(customerid, updateData);

            res.status(200).send({ message: 'Customer updated successfully' });
        } catch (err) {
            res.status(400).send({ message: err.message });
        }
    };

    async delete(req, res) {
        try {
            const { customerid } = req.params;

            const customer = await Customers.findById(customerid);

            if (!customer) {
                throw new Error('Customer not found');
            };

            await Customers.findByIdAndDelete(customerid);

            res.status(200).send({ message: 'Customer deleted successfully' });
        } catch (err) {
            res.status(400).send({ message: err.message });
        }
    };
};

module.exports = new CustomersController();
