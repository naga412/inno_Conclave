// services/participants/participant.model.js
// Data-access layer — raw SQL only, no business logic
const db = require('../../db');

const findByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT id FROM participants WHERE email = ?', [email]
  );
  return rows[0] || null;
};

const findById = async (id) => {
  const [rows] = await db.execute(
    `SELECT id, name, email, phone, college, department,
            lunch, lunch_status, payment_screenshot, photo, registered_at
     FROM participants WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
};

const findAll = async () => {
  const [rows] = await db.execute(
    `SELECT id, name, email, phone, college, department,
            lunch, lunch_status, payment_screenshot, photo, registered_at
     FROM participants ORDER BY registered_at DESC`
  );
  return rows;
};

const create = async ({ name, email, phone, college, department, lunch, lunchStatus, screenshotPath, photoPath, hash }) => {
  const [result] = await db.execute(
    `INSERT INTO participants
       (name, email, phone, college, department, lunch, lunch_status, payment_screenshot, photo, password)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name, email, phone, college, department, 
      lunch ? 1 : 0, 
      lunchStatus || 'none', 
      screenshotPath || '', 
      photoPath || '', 
      hash
    ]
  );
  return result.insertId;
};

const updateLunchStatus = async (id, status) => {
  const [result] = await db.execute(
    'UPDATE participants SET lunch_status = ? WHERE id = ?', [status, id]
  );
  return result.affectedRows;
};

const updatePhoto = async (id, photoFilename) => {
  const [result] = await db.execute(
    'UPDATE participants SET photo = ? WHERE id = ?', [photoFilename, id]
  );
  return result.affectedRows;
};

const updateProfile = async (id, { name, phone, college, department }) => {
  const [result] = await db.execute(
    'UPDATE participants SET name = ?, phone = ?, college = ?, department = ? WHERE id = ?',
    [name, phone, college, department, id]
  );
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await db.execute('DELETE FROM participants WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = { findByEmail, findById, findAll, create, updateLunchStatus, updatePhoto, updateProfile, remove };
