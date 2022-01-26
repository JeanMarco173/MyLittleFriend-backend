const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createCustomer } = require('../controllers/payment.controller');

router.post(
  '/card',
  body('number').isString().isLength(16),
  body('exp_year').isString().isLength(4),
  body('exp_month').isString().isLength(2),
  body('cvc').isString().isLength(3),
  body('customerId').isString(),
  createCustomer
)

module.exports = router;
