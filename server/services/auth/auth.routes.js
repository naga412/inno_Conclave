// services/auth/auth.routes.js
const router     = require('express').Router();
const controller = require('./auth.controller');

/**
 * @route  POST /api/auth/login
 * @desc   Unified login for participant | exhibitor | admin
 * @access Public
 */
router.post('/login', controller.login);

module.exports = router;
