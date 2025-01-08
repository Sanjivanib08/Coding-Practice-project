const express = require('express');
const router = express.Router();
const bundleController = require('../controllers/BundleController');

// Create bundle
router.post('/create', bundleController.createBundle);

// Get all bundles
router.get('/', bundleController.getAllBundles);

module.exports = router;
