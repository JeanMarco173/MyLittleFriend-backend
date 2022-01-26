const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PaymentSchema = require('./payment.schema');

const CustomerSchema = new Schema({
    full_name: { type: String, required: true, maxLength: 150 },
    email: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true },
    address: { type: String, required: true, maxLength: 120 },
    pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
    paymenth_method_id: { type: String, required: false },
    avatar_url: { type: String }
});

module.exports = mongoose.model('Customer', CustomerSchema);
