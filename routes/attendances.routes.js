const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateJWT = passport.authenticate('jwt', { session:false, failWithError: true });
const { registerAttendace } = require('../controllers/attendace.controller');
const { createAttendanceValidation } = require('../validator/attendance.validator.js');

/**
 * GET
 */
router.get('/', (req, res, next) => {
    res.status(200).json({
        data: 'Attendances list',
        message: 'OK'
    });
});

/**
 * POST
 */
router.post(
    '/',
    validateJWT,
    createAttendanceValidation,
    registerAttendace
);

module.exports = router;
