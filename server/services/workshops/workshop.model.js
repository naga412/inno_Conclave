// services/workshops/workshop.model.js
const db = require('../../db');

const findAll = async () => {
  const [rows] = await db.execute(
    'SELECT * FROM workshops ORDER BY day ASC, time ASC'
  );
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM workshops WHERE id = ?', [id]);
  return rows[0] || null;
};

const create = async ({ title, speaker, time, duration, day, seats, category }) => {
  const [result] = await db.execute(
    `INSERT INTO workshops (title, speaker, time, duration, day, seats, category)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, speaker, time, duration, day, parseInt(seats, 10), category || null]
  );
  return result.insertId;
};

const update = async (id, fields) => {
  const { title, speaker, time, duration, day, seats, category } = fields;
  const [result] = await db.execute(
    `UPDATE workshops
     SET title    = COALESCE(?, title),
         speaker  = COALESCE(?, speaker),
         time     = COALESCE(?, time),
         duration = COALESCE(?, duration),
         day      = COALESCE(?, day),
         seats    = COALESCE(?, seats),
         category = COALESCE(?, category)
     WHERE id = ?`,
    [title, speaker, time, duration, day, seats ? parseInt(seats, 10) : null, category, id]
  );
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await db.execute('DELETE FROM workshops WHERE id = ?', [id]);
  return result.affectedRows;
};

// --- Registration Logic ---

const registerParticipant = async (participantId, workshopId) => {
  const [result] = await db.execute(
    'INSERT INTO workshop_registrations (participant_id, workshop_id) VALUES (?, ?)',
    [participantId, workshopId]
  );
  return result.insertId;
};

const checkRegistration = async (participantId, workshopId) => {
  const [rows] = await db.execute(
    'SELECT id FROM workshop_registrations WHERE participant_id = ? AND workshop_id = ?',
    [participantId, workshopId]
  );
  return rows[0] || null;
};

const findRegistrationsByWorkshop = async (workshopId) => {
  const [rows] = await db.execute(
    `SELECT p.id, p.name, p.email, p.college, p.department, wr.registered_at
     FROM workshop_registrations wr
     JOIN participants p ON wr.participant_id = p.id
     WHERE wr.workshop_id = ?
     ORDER BY wr.registered_at DESC`,
    [workshopId]
  );
  return rows;
};

const findWorkshopsByParticipant = async (participantId) => {
  const [rows] = await db.execute(
    `SELECT w.id, w.title, w.speaker, w.time, w.duration, w.day, w.category, wr.registered_at
     FROM workshop_registrations wr
     JOIN workshops w ON wr.workshop_id = w.id
     WHERE wr.participant_id = ?
     ORDER BY wr.registered_at DESC`,
    [participantId]
  );
  return rows;
};

const decrementSeats = async (workshopId) => {
  const [result] = await db.execute(
    'UPDATE workshops SET seats = seats - 1 WHERE id = ? AND seats > 0',
    [workshopId]
  );
  return result.affectedRows; // returns 0 if seats were 0
};

module.exports = { 
  findAll, 
  findById, 
  create, 
  update, 
  remove,
  registerParticipant,
  checkRegistration,
  findRegistrationsByWorkshop,
  findWorkshopsByParticipant,
  decrementSeats
};
