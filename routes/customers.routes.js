const express = require('express');
const router = express.Router();
const { body } = require('express-validator')

const { signUpCustomer, loginCustomer, findCustomer } = require('../controllers/customer.controller');
const { findPetsByOwner } = require('../controllers/pet.controller');

router.get('/:customerId', findCustomer);
router.get('/:customerId/pets', findPetsByOwner);

router.post('/',
    body('full_name').notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('password', 'The password must be between 6 and 20 characters long').isLength({ min: 6, max: 20 }),
    body('address').notEmpty(),
    body('avatar_url').optional({ checkFalsy: true }).isString(),
    signUpCustomer
);

router.post('/login',
    body('email').isEmail().normalizeEmail(),
    body('password', 'The password must be between 6 and 20 characters long').isLength({ min: 6, max: 20 }),
    loginCustomer
)


module.exports = router;
