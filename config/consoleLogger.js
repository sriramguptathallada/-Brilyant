const winstonRotate = require("winston-daily-rotate-file");
const util = require('util'); 
const { createLogger, format, transports } = require("winston");  
require("dotenv").config();  require("dotenv").config();

const transportOptions = {
  dirname: process.env.DEBUG_FOLDER,
  filename: "%DATE%.log",
  datePattern: "DD-MM-YYYY--HH-MM",
  level: "debug",
  maxSize: "1g",
  frequency: "2h",
};

const logger = createLogger({  
  level: "debug",  
  format: format.combine(  
    format.timestamp({  
      format: "YYYY-MM-DD HH:mm:ss.SSS",  
    }),  
    format.printf(info => {  
      let message = info.message;  
      return `${info.timestamp} -> ${message}`;  
    })  
  ),  
  transports: [  
    new transports.Console(),  
    new winstonRotate(transportOptions)  
  ],  
  exitOnError: false,  
  handleExceptions: true,  
}); 

function serializeError(error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        name: error.name,
        stack: error.stack,
      };
    }
    return error;
}

// Override console.log and console.error
console.log = function () {
  const args = Array.from(arguments).map(arg => {
    if (arg instanceof Error) {
      return JSON.stringify(serializeError(arg));
    }
    try {
      // Check if the argument is an object (excluding null)
      if (typeof arg === 'object' && arg !== null) {
        // Attempt to stringify the object to detect circular references
        JSON.stringify(arg);
        // If successful, return the JSON string representation
        return JSON.stringify(arg);
      } else {
        // For non-object types, return them as-is
        return arg;
      }
    } catch (error) {
      // If JSON.stringify throws an error (e.g., circular reference), use util.inspect
      return util.inspect(arg, { showHidden: false, depth: null });
    }
  });
  logger.debug(args.join(' '));
};

console.error = function () {
  const args = Array.from(arguments).map(arg => {
    if (arg instanceof Error) {
      return JSON.stringify(serializeError(arg));
    }
    try {
      // Check if the argument is an object (excluding null)
      if (typeof arg === 'object' && arg !== null) {
        // Attempt to stringify the object to detect circular references
        JSON.stringify(arg);
        // If successful, return the JSON string representation
        return JSON.stringify(arg);
      } else {
        // For non-object types, return them as-is
        return arg;
      }
    } catch (error) {
      // If JSON.stringify throws an error (e.g., circular reference), use util.inspect
      return util.inspect(arg, { showHidden: false, depth: null });
    }
  });
  logger.debug(args.join(' '));
};

module.exports = logger;
