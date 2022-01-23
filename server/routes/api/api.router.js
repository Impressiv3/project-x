const router = require('express').Router();
const { createUser } = require('../../controllers/users/create_user.js');
const { login } = require('../../controllers/users/login.js');

const { verifySignUp } = require("../../middlewares");
const controller = require("../../controllers/auth/auth.controller");


router.post('/user', createUser);
router.post('/login', login); 

router.post('/signup', controller.signup);
router.post('/signin', controller.signin); 


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

