// services/exhibitors/exhibitor.service.js
const bcrypt = require('bcryptjs');
const model  = require('./exhibitor.model');

async function register({ org_name, org_type, college_year, contact_name, email, tagline, password, files }) {
  if (!org_name || !org_type || !contact_name || !email || !password)
    throw Object.assign(new Error('Required fields missing'), { code: 400 });

  if (!files?.payment_proof?.[0])
    throw Object.assign(new Error('Payment proof is required'), { code: 400 });

  const existing = await model.findByEmail(email);
  if (existing)
    throw Object.assign(new Error('Email already registered'), { code: 409 });

  const hash              = await bcrypt.hash(password, 10);
  const posterPath        = files?.poster?.[0]?.filename        || null;
  const paymentProofPath  = files?.payment_proof?.[0]?.filename || null;

  const id = await model.create({
    org_name, org_type, college_year, contact_name,
    email, tagline, posterPath, paymentProofPath, hash,
  });

  return { exhibitorId: id, message: 'Registration submitted — pending admin approval' };
}

async function getAllExhibitors() {
  return model.findAll();
}

async function getApprovedExhibitors() {
  return model.findApproved();
}

async function getPublicExhibitorProfile(id) {
  const e = await model.findById(id);
  if (!e || e.status !== 'approved') throw Object.assign(new Error('Exhibitor not found'), { code: 404 });
  return e;
}

async function getMyProfile(userId) {
  const e = await model.findById(userId);
  if (!e) throw Object.assign(new Error('Exhibitor not found'), { code: 404 });
  return e;
}

async function changeStatus(id, status) {
  const valid = ['approved', 'rejected', 'pending'];
  if (!valid.includes(status))
    throw Object.assign(new Error("status must be 'approved', 'rejected', or 'pending'"), { code: 400 });

  const affected = await model.updateStatus(id, status);
  if (!affected) throw Object.assign(new Error('Exhibitor not found'), { code: 404 });

  return { message: `Exhibitor status updated to ${status}` };
}

async function addProject(exhibitorId, { title, description, files }) {
  if (!title || !description)
    throw Object.assign(new Error('Title and description are required'), { code: 400 });

  let imagePaths = [];
  if (files && files.length > 0) {
    if (files.length > 5) throw Object.assign(new Error('Maximum 5 images allowed'), { code: 400 });
    imagePaths = files.map(f => f.filename);
  }

  const id = await model.createProject(exhibitorId, title, description, imagePaths);
  return { projectId: id, message: 'Project added successfully' };
}

async function getProjectsByExhibitor(exhibitorId) {
  return model.findProjectsByExhibitor(exhibitorId);
}

async function getPublicProjectsByExhibitor(exhibitorId) {
  const e = await model.findById(exhibitorId);
  if (!e || e.status !== 'approved') throw Object.assign(new Error('Projects not found'), { code: 404 });
  return model.findProjectsByExhibitor(exhibitorId);
}

async function addTeamMember(exhibitorId, { name, role, email, files }) {
  if (!name || !role)
    throw Object.assign(new Error('Name and role are required'), { code: 400 });

  const photoPath = files?.photo?.[0]?.filename || null;
  const id = await model.createTeamMember(exhibitorId, { name, role, email, photoPath });
  return { memberId: id, message: 'Team member added successfully' };
}

async function getTeamMembers(exhibitorId) {
  return model.findTeamMembersByExhibitor(exhibitorId);
}

async function removeTeamMember(memberId, exhibitorId) {
  const affected = await model.deleteTeamMember(memberId, exhibitorId);
  if (!affected) throw Object.assign(new Error('Team member not found'), { code: 404 });
  return { message: 'Team member removed' };
}

module.exports = { 
  register, 
  getAllExhibitors, 
  getApprovedExhibitors,
  getMyProfile, 
  getPublicExhibitorProfile,
  changeStatus, 
  addProject, 
  getProjectsByExhibitor,
  getPublicProjectsByExhibitor,
  addTeamMember,
  getTeamMembers,
  removeTeamMember,
};
