require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const errorhandler = require('errorhandler');
const routes = require('./server/routes/routes');

const app = express();
// TODO : MAKE PREFIX DEPENDING ON NODE_ENV
const corsOptions = {
  origin: 'http://localhost:3000/',
};

app.use(logger('dev')), app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/', routes);

app.get('/*', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
  next();
});

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

module.exports = app;
