// services/auth/auth.service.js
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const db      = require('../../db');

const TABLE = { participant: 'participants', exhibitor: 'exhibitors', admin: 'admins' };

const QUERIES = {
  admin:       'SELECT id, email, password FROM admins WHERE email = ?',
  participant: 'SELECT id, name, email, password FROM participants WHERE email = ?',
  exhibitor:   'SELECT id, org_name AS name, email, password, status FROM exhibitors WHERE email = ?',
};

async function loginUser({ email, password, role }) {
  if (!TABLE[role]) throw Object.assign(new Error('Invalid role'), { code: 400 });

  const [rows] = await db.execute(QUERIES[role], [email]);
  const user   = rows[0];

  if (!user) throw Object.assign(new Error('Invalid credentials'), { code: 401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match)  throw Object.assign(new Error('Invalid credentials'), { code: 401 });

  // Exhibitors that are rejected cannot log in
  if (role === 'exhibitor' && user.status === 'rejected')
    throw Object.assign(new Error('Your application has been rejected'), { code: 403 });

  const payload = { id: user.id, email: user.email, role };
  const token   = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  const { password: _pw, ...safeUser } = user;
  return { token, role, user: safeUser };
}

module.exports = { loginUser };
