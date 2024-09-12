const httpStatus = require('http-status');

exports.validateDataAndRespond = (schema) => {
  return function (req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: 'FAILURE',
        statusCode: httpStatus.BAD_REQUEST,
        message: 'REQUEST BODY IS MISSING OR MALFORMED',
        result: []
      });
    }
    
    const { error } = schema(req).validate(req.body);
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message.toUpperCase());
      return res.status(httpStatus.BAD_REQUEST).json({
        status: 'FAILURE',
        statusCode: httpStatus.BAD_REQUEST,
        message: 'INVALID REQUEST PAYLOAD',
        result: errorMessages
      });
    }

    next();
  };
};

exports.validatePathParams = (schema) => {
  return function (req, res, next) {
    const { error } = schema.validate(req.params);
    
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message.toUpperCase());

      return res.status(httpStatus.BAD_REQUEST).json({
        status: 'FAILURE',
        statusCode: httpStatus.BAD_REQUEST,
        message: 'INVALID REQUEST PAYLOAD',
        result: errorMessages // Result messages in uppercase
      });
    }
    
    next();
  };
};