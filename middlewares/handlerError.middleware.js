const { validationResult, Result } = require('express-validator');

const handlerError =  (error, req, res, next) => {
  const validation = validationResult(req);
  console.log("Error", error);
  if (validation.errors.length || error instanceof Result ) {
    return res.status(403).json({
      message: validation.errors || error.array(),
      status: 'Failed',
      data: {}
    })
  }

  res.status(error.status || 503).json({
    message: error.message || 'Internal error. Please, try again.',
    status: 'Failed',
    data: {}
  });
};

module.exports = handlerError;
