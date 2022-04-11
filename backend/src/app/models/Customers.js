const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        legal_person: {
            type: Boolean,
            required: true,
        },
        cpf_or_cnpj: {
            type: String,
            required: true,
            minlength: 11,
            maxlength: 14,
        },
        phone_number: {
            type: String,
            required: true,
            minlength: 11,
            maxlength: 11,
        },
        contract_date: {
            type: Date,
            required: true,
        },
        contract_value: {
            type: Number,
            required: true,
        },
        contract_situation: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            required: false,
        },
        administrator: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Customers', customersSchema);
