// services/participants/participant.service.js
// Business logic layer
const bcrypt = require('bcryptjs');
const model  = require('./participant.model');

async function register({ name, email, phone, college, department, lunch, screenshotFile, photoFile, password }) {
  // Validate required fields
  if (!name || !email || !phone || !college || !department || !password)
    throw Object.assign(new Error('All required fields must be provided'), { code: 400 });

  const wantsLunch = lunch === 'true' || lunch === true;

  if (wantsLunch && !screenshotFile)
    throw Object.assign(new Error('Payment screenshot is required for lunch opt-in'), { code: 400 });

  // Check duplicate
  const existing = await model.findByEmail(email);
  if (existing)
    throw Object.assign(new Error('Email already registered'), { code: 409 });

  const hash          = await bcrypt.hash(password, 10);
  const screenshotPath = screenshotFile ? screenshotFile.filename : null;
  const photoPath      = photoFile ? photoFile.filename : null;
  const lunchStatus   = wantsLunch ? 'pending' : 'none';

  const id = await model.create({
    name, email, phone, college, department,
    lunch: wantsLunch, lunchStatus, screenshotPath, photoPath, hash,
  });

  return { participantId: id, message: 'Registration successful' };
}

async function getAllParticipants() {
  return model.findAll();
}

async function getMyProfile(userId) {
  const p = await model.findById(userId);
  if (!p) throw Object.assign(new Error('Participant not found'), { code: 404 });
  return p;
}

async function confirmLunch(id, status) {
  const valid = ['confirmed', 'pending'];
  if (!valid.includes(status))
    throw Object.assign(new Error("status must be 'confirmed' or 'pending'"), { code: 400 });

  const affected = await model.updateLunchStatus(id, status);
  if (!affected) throw Object.assign(new Error('Participant not found'), { code: 404 });

  return { message: `Lunch status updated to ${status}` };
}

async function removeParticipant(id) {
  const affected = await model.remove(id);
  if (!affected) throw Object.assign(new Error('Participant not found'), { code: 404 });
  return { message: 'Participant removed' };
}

async function exportAll() {
  const participants = await model.findAll();

  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const headers = ['ID', 'Name', 'Email', 'Phone', 'College', 'Department', 'Lunch Opt-In', 'Lunch Status', 'Registered At'];
  const rows = participants.map(p => {
    return [
      `IC2026-${String(p.id).padStart(5, '0')}`,
      p.name,
      p.email,
      p.phone,
      p.college,
      p.department,
      p.lunch ? 'Yes' : 'No',
      p.lunch ? (p.lunch_status || 'pending') : 'N/A',
      new Date(p.registered_at).toLocaleString()
    ].map(escapeCsv).join(',');
  });

  return [headers.map(escapeCsv).join(','), ...rows].join('\n');
}

async function updatePhoto(userId, photoFile) {
  if (!photoFile)
    throw Object.assign(new Error('Photo file is required'), { code: 400 });

  const affected = await model.updatePhoto(userId, photoFile.filename);
  if (!affected) throw Object.assign(new Error('Participant not found'), { code: 404 });

  return { photo: photoFile.filename, message: 'Photo updated successfully' };
}

async function updateProfile(userId, { name, phone, college, department }) {
  if (!name || !phone || !college || !department)
    throw Object.assign(new Error('All fields are required'), { code: 400 });

  const affected = await model.updateProfile(userId, { name, phone, college, department });
  if (!affected) throw Object.assign(new Error('Participant not found'), { code: 404 });

  const updated = await model.findById(userId);
  return updated;
}

module.exports = { register, getAllParticipants, getMyProfile, confirmLunch, removeParticipant, exportAll, updatePhoto, updateProfile };
