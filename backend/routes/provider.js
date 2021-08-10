const express = require('express');
const ProviderController = require('../controllers/provider');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/create/:id', ProviderController.createSecret);

router.get('', checkAuth, ProviderController.getDetails);

router.get('/traffic', ProviderController.getTrafficDetails);

module.exports = router;
