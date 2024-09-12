const express = require("express");
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
let path = require("path");
const fs = require("fs");
const winston = require('winston');
const util = require('util');
const httpStatus = require('http-status');
require('./config/consoleLogger');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require("./routes/index");

const app = express();

// set security HTTP headers
app.use(helmet());

app.use(express.json()); // Middleware to parse JSON request bodies

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// enable cors
app.use(cors());
app.options('*', cors());

app.use(authLimiter);

const baseDir = path.resolve(__dirname, 'logs/');
const logDirectory = path.join(baseDir);
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
// Set up the logger
const crashLog = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDirectory, 'crash.log') })
  ]
});

process.on('uncaughtException', (err) => {
  console.log('uncaughtException',err)
  crashLog.error(`Uncaught Exception: ${util.inspect(err)}`, () => {
    process.exit(1);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('unhandledRejection',reason,promise)
  crashLog.error(`Unhandled Rejection at: ${util.inspect(promise)} reason: ${util.inspect(reason)}`, () => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    crashLog.info('Process terminated');
    console.log('Process terminated');
  });
});

app.use(routes);

app.all("*", (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({ message: "Page not found" });
});

module.exports = app;
