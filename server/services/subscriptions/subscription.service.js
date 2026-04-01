// services/subscriptions/subscription.service.js
const model = require('./subscription.model');

/**
 * Handles adding a new subscription.
 * @param {string} email 
 * @returns {Promise<Object>}
 */
const subscribe = async (email) => {
    if (!email || !email.includes('@')) {
        throw Object.assign(new Error('Valid email address required'), { code: 400 });
    }

    const existing = await model.findByEmail(email);
    if (existing) {
        throw Object.assign(new Error('Email already subscribed'), { code: 409 });
    }

    const id = await model.create(email);
    return { subscriptionId: id, message: 'Subscribed successfully!' };
};

/**
 * Retrieves all subscriptions.
 * @returns {Promise<Array>}
 */
const getAllSubscriptions = async () => {
    return model.findAll();
};

module.exports = { subscribe, getAllSubscriptions };
