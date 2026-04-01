// services/subscriptions/subscription.routes.js
const router = require('express').Router();
const controller = require('./subscription.controller');
const { requireAdmin } = require('../../shared/middleware/auth');

/**
 * @route   POST /api/subscriptions
 * @desc    Submit an email to subscribe to newsletter
 * @access  Public
 */
router.post('/', controller.subscribe);

/**
 * @route   GET /api/subscriptions
 * @desc    List all subscriptions
 * @access  Admin
 */
router.get('/', requireAdmin, controller.getAll);

module.exports = router;
