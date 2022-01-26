var epayco = require('epayco-sdk-node')({
  apiKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  lang: 'ES',
  test: true
})

const generateToken = async (credit_info) => {
  try{
    const newToken = await epayco.token.create(credit_info);
    return newToken.id;
  } catch (error) {
    console.log('error', error);
    return error;
  }
}

const registerCustomer = async (customer_info) => {
  try{
    const newCustomer = await epayco.customers.create(customer_info);
    return newCustomer.data.customerId;
  } catch (error) {
    return error;
  }
}

module.exports = { generateToken, registerCustomer }
