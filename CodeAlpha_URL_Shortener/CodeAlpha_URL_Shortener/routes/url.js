const express = require('express');
const { handleGenerateNewShortURL, handleGeTAnalytics } = require('../controllers/url');
const router = express.Router();
router.post("/", handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleGeTAnalytics);
module.exports = router;
