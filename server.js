const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

app.use((req, res, next) => {
  logger.info({
    message: 'Request',
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    headers: req.headers,
  });

  const oldSend = res.send;
  res.send = function (data) {
    logger.info({
      message: 'Response',
      status: res.statusCode,
      body: data,
    });
    oldSend.apply(res, arguments);
  };
  next();
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Calculator</title>
      </head>
      <body>
        <h1>Hello JS!!</h1>
        <p>This is a calculator, served via Express.</p>
      </body>
    </html>
  `);
});

function checkInputs(req, res, next) {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input parameters');
    return res.status(400).json({ error: 'Invalid input parameters' });
  }
  // Pass control to the next middleware function
  next();
}

app.post('/add', checkInputs, (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const result = num1 + num2;
  logger.info(`Performed addition of ${num1} and ${num2} to get ${result}`);
  res.setHeader('Content-Type', 'application/json');
  return res.json({ result: result });
});

app.post('/subtract', checkInputs, (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const result = num1 - num2;
  logger.info(`Performed subtraction of ${num2} from ${num1} to get ${result}`);
  res.setHeader('Content-Type', 'application/json');
  return res.json({ result: result });
});

app.post('/multiply', checkInputs, (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const result = num1 * num2;
  logger.info(`Performed multiplication of ${num1} and ${num2} to get ${result}`);
  res.setHeader('Content-Type', 'application/json');
  return res.json({ result: result });
});

app.post('/divide', checkInputs, (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  if (num2 === 0) {
    logger.error('Attempted to divide by zero');
    return res.status(400).json({ error: 'Cannot divide by zero' });
  }
  const result = num1 / num2;
  logger.info(`Performed division of ${num1} by ${num2} to get ${result}`);
  res.setHeader('Content-Type', 'application/json');
  return res.json({ result: result });
});

app.listen(config.port, () => {
  logger.info(`Calculator microservice listening at http://localhost:${config.port}`);
});

module.exports = app;