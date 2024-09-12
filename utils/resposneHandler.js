const { dynamicLogger } = require("../config/logger");
require("dotenv").config();

exports.responseHandler = (req, res, statusCode, message, result) => {
  const data = { statusCode, message, result };
  try {
    if (statusCode === 200 || statusCode === 201) {
      data.status = "SUCCESS";
      const logger = dynamicLogger(process.env.INFO_FOLDER, "info");
      logger.info(data);
      delete data.level
      res.status(statusCode).send(data);
    } else {
      const logger = dynamicLogger(process.env.ERROR_FOLDER, "error");
      data.status = "FAILURE";
      logger.error(data);
      delete data.level
      res.status(statusCode).send(data);
    }
  } catch (error) {
    // Handle any errors that occur during response handling
    console.error('Error in responseHandler:', error);
  }
};
