// services/subscriptions/subscription.model.js
const db = require('../../db');

/**
 * Creates a new subscription entry in the database.
 * @param {string} email 
 * @returns {Promise<number>} - Inserted ID
 */
const create = async (email) => {
    const [result] = await db.execute(
        'INSERT INTO subscriptions (email) VALUES (?)',
        [email]
    );
    return result.insertId;
};

/**
 * Retrieves all subscriptions ordered by subscription date.
 * @returns {Promise<Array>}
 */
const findAll = async () => {
    const [rows] = await db.execute(
        'SELECT id, email, subscribed_at FROM subscriptions ORDER BY subscribed_at DESC'
    );
    return rows;
};

/**
 * Finds a subscription by email.
 * @param {string} email 
 * @returns {Promise<Object|null>}
 */
const findByEmail = async (email) => {
    const [rows] = await db.execute(
        'SELECT id FROM subscriptions WHERE email = ?',
        [email]
    );
    return rows[0] || null;
};

module.exports = { create, findAll, findByEmail };
