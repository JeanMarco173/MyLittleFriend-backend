const { body, check } = require('express-validator');

const createAttendanceValidation = [
  body('date').isDate(),
  body('veterinary').notEmpty(),
  body('pet').notEmpty(),
  body('attendance_detail').notEmpty(),
  body('recipe').isArray(),
    check('recipe.*.name').notEmpty(),
    check('recipe.*.detail').notEmpty()
];

module.exports = { createAttendanceValidation }
