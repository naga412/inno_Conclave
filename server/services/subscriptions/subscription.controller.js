// services/subscriptions/subscription.controller.js
const service = require('./subscription.service');
const R = require('../../shared/utils/response');

const handleErr = (res, err) => {
    if (err.code === 400) return R.badRequest(res, err.message);
    if (err.code === 409) return R.conflict(res, err.message);
    return R.serverError(res, err);
};

/**
 * Public endpoint to subscribe an email.
 * @param {Object} req 
 * @param {Object} res 
 */
async function subscribe(req, res) {
    try {
        const { email } = req.body;
        const result = await service.subscribe(email);
        return R.created(res, result);
    } catch (err) { return handleErr(res, err); }
}

/**
 * Admin endpoint to list all subscriptions.
 * @param {Object} req 
 * @param {Object} res 
 */
async function getAll(req, res) {
    try {
        const list = await service.getAllSubscriptions();
        return R.ok(res, list);
    } catch (err) { return handleErr(res, err); }
}

module.exports = { subscribe, getAll };
