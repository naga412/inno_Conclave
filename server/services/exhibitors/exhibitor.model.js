// services/exhibitors/exhibitor.model.js
const db = require('../../db');

const findByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT id FROM exhibitors WHERE email = ?', [email]
  );
  return rows[0] || null;
};

const findById = async (id) => {
  const [rows] = await db.execute(
    `SELECT id, org_name, org_type, college_year, contact_name,
            email, tagline, poster_path, payment_proof, status, registered_at
     FROM exhibitors WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
};

const findAll = async () => {
  const [rows] = await db.execute(
    `SELECT id, org_name, org_type, college_year, contact_name, email,
            tagline, poster_path, payment_proof, status, registered_at
     FROM exhibitors ORDER BY registered_at DESC`
  );
  return rows;
};

const findApproved = async () => {
  const [rows] = await db.execute(
    `SELECT id, org_name, org_type, college_year, contact_name, email,
            tagline, poster_path, status, registered_at
     FROM exhibitors WHERE status = 'approved' ORDER BY registered_at DESC`
  );
  return rows;
};

const create = async ({
  org_name, org_type, college_year, contact_name,
  email, tagline, posterPath, paymentProofPath, hash,
}) => {
  const [result] = await db.execute(
    `INSERT INTO exhibitors
       (org_name, org_type, college_year, contact_name, email, tagline, poster_path, payment_proof, password)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [org_name, org_type, college_year || null, contact_name, email,
     tagline || null, posterPath, paymentProofPath, hash]
  );
  return result.insertId;
};

const updateStatus = async (id, status) => {
  const [result] = await db.execute(
    'UPDATE exhibitors SET status = ? WHERE id = ?', [status, id]
  );
  return result.affectedRows;
};

const createProject = async (exhibitorId, title, description, images) => {
  const imagesJson = JSON.stringify(images);
  const [result] = await db.execute(
    `INSERT INTO exhibitor_projects (exhibitor_id, title, description, images) VALUES (?, ?, ?, ?)`,
    [exhibitorId, title, description, imagesJson]
  );
  return result.insertId;
};

const findProjectsByExhibitor = async (exhibitorId) => {
  const [rows] = await db.execute(
    `SELECT * FROM exhibitor_projects WHERE exhibitor_id = ? ORDER BY created_at DESC`,
    [exhibitorId]
  );
  return rows;
};

const createTeamMember = async (exhibitorId, { name, role, email, photoPath }) => {
  const [result] = await db.execute(
    `INSERT INTO exhibitor_team_members (exhibitor_id, name, role, email, photo) VALUES (?, ?, ?, ?, ?)`,
    [exhibitorId, name, role, email || null, photoPath || null]
  );
  return result.insertId;
};

const findTeamMembersByExhibitor = async (exhibitorId) => {
  const [rows] = await db.execute(
    `SELECT * FROM exhibitor_team_members WHERE exhibitor_id = ? ORDER BY created_at ASC`,
    [exhibitorId]
  );
  return rows;
};

const deleteTeamMember = async (memberId, exhibitorId) => {
  const [result] = await db.execute(
    `DELETE FROM exhibitor_team_members WHERE id = ? AND exhibitor_id = ?`,
    [memberId, exhibitorId]
  );
  return result.affectedRows;
};

module.exports = { findByEmail, findById, findAll, findApproved, create, updateStatus, createProject, findProjectsByExhibitor, createTeamMember, findTeamMembersByExhibitor, deleteTeamMember };
