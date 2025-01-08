const express = require('express');
const router = express.Router();
const testCaseController = require('../controllers/TestCaseController');

// Generate test cases for a problem
router.post('/generate', testCaseController.generateTestCases);

module.exports = router;
