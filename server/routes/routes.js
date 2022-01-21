const router = require('express').Router();
const api_router = require('./api/api.router')

router.use('/api', api_router);

module.exports = router;