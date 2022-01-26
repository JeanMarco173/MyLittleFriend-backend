const { generateToken, registerCustomer } = require('../utils/pasarela/index');
const { validationResult } = require('express-validator');
const CustomerServices = require('../services/customer.services');

const createCustomer = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(403).json({
        message: errors,
        status: 'Failed',
        data: {}
    });
  }

  try{
    const cardData = {
      "card[number]": req.body.number,
      "card[exp_year]": req.body.exp_year,
      "card[exp_month]": req.body.exp_month,
      "card[cvc]": req.body.cvc
    }
    const cardToken = await generateToken(cardData);
    const customerId = req.body.customerId;
    const customer = await CustomerServices.findById(customerId);

    var customerData = {
      token_card: cardToken,
      name: customer.full_name,
      last_name: customer.full_name, 
      email: customer.email,
      default: true,
      address: customer.address
    }
    const paymenthId = await registerCustomer(customerData);
    console.log('paymenthId', paymenthId);
    const customerUpdated =  await CustomerServices.putPaymenthId(customerId, paymenthId)
    res.status(200).json({
      message: 'The credit card was registerd succesfull.',
      status: 'Ok',
      data: { customerUpdated }
    });
  } catch (error) {
    console.log('error', error);
    res.status(503).json({
      message: error.message,
      status: 'Failed',
      data: error.data
    });
  }

}

module.exports = { createCustomer }
