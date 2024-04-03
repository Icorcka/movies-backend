const express = require('express');
const { createSession } = require('../controllers/sessionController');
const router = express.Router();

router.post('/create', createSession);

module.exports = router;
