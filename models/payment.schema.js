const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  cardId: { type: String, required: true },
  mask: { type: String, required: true },
  exp_year: { type: String, required: true },
  exp_month: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = PaymentSchema;