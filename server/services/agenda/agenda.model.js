const db = require('../../db');

const findAll = async () => {
  const [rows] = await db.execute(`
    SELECT * FROM agenda
    ORDER BY day ASC, start_time ASC
  `);
  return rows;
};

const create = async ({ day, start_time, time_label, title, speaker, location, category, description }) => {
  const [result] = await db.execute(`
    INSERT INTO agenda (day, start_time, time_label, title, speaker, location, category, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [day, start_time, time_label, title, speaker || null, location || null, category || null, description || null]);
  return result.insertId;
};

const update = async (id, { day, start_time, time_label, title, speaker, location, category, description }) => {
  const [result] = await db.execute(`
    UPDATE agenda
    SET day = ?, start_time = ?, time_label = ?, title = ?, speaker = ?, location = ?, category = ?, description = ?
    WHERE id = ?
  `, [day, start_time, time_label, title, speaker || null, location || null, category || null, description || null, id]);
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await db.execute('DELETE FROM agenda WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = { findAll, create, update, remove };
