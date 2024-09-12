const winston = require('winston');
const winstonRotate = require('winston-daily-rotate-file');

// Define a custom format for the logger
const myFormat = winston.format.combine(
  winston.format.errors({ stack: true }), // Include error stack traces if any
  winston.format.splat(), // Enable string interpolation
  winston.format.printf(({ message }) => message) // Custom format, only message
);

// Define the dynamicLogger function
exports.dynamicLogger = (directory, level) => {
  const transportOptions = {
    dirname: directory, // Directory for log files
    filename: '%DATE%.log', // Log file name pattern with date
    datePattern: 'DD-MM-YYYY--HH-mm', // Date pattern in filename
    maxSize: '20m', // Max size of each log file before rotation
    frequency: '15m', // Rotation frequency
    format: myFormat, // Custom log format
  };

  const logger = winston.createLogger({
    level: level, // Set the log level dynamically
    transports: [
      new winstonRotate(transportOptions) // File rotation transport
    ],
    exitOnError: false, // Continue logging even if an exception occurs
    handleExceptions: true // Handle uncaught exceptions
  });

  return logger;
};
