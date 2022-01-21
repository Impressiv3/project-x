const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    WARNING:
      'A list if API endpoints can be found at: http://www.localhost/api-endpoins.html',
  });
});

router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;
        return errors;
      }, {}),
    });
  }

  return next(err);
});

module.exports = router;
