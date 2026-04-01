// services/exhibitors/exhibitor.controller.js
const service = require('./exhibitor.service');
const R       = require('../../shared/utils/response');

const handleErr = (res, err) => {
  if (err.code === 400) return R.badRequest(res, err.message);
  if (err.code === 401) return R.unauthorized(res, err.message);
  if (err.code === 403) return R.forbidden(res, err.message);
  if (err.code === 404) return R.notFound(res, err.message);
  if (err.code === 409) return R.conflict(res, err.message);
  return R.serverError(res, err);
};

// POST /api/exhibitors/register
async function register(req, res) {
  try {
    const result = await service.register({ ...req.body, files: req.files });
    return R.created(res, result);
  } catch (err) { return handleErr(res, err); }
}

// GET /api/exhibitors
async function getAll(req, res) {
  try {
    const list = await service.getAllExhibitors();
    return R.ok(res, list);
  } catch (err) { return handleErr(res, err); }
}

// GET /api/exhibitors/me
async function getMe(req, res) {
  try {
    const profile = await service.getMyProfile(req.user.id);
    return R.ok(res, profile);
  } catch (err) { return handleErr(res, err); }
}

// PATCH /api/exhibitors/:id/status
async function updateStatus(req, res) {
  try {
    const result = await service.changeStatus(req.params.id, req.body.status);
    return R.ok(res, result);
  } catch (err) { return handleErr(res, err); }
}

// POST /api/exhibitors/me/projects
async function addProject(req, res) {
  try {
    const result = await service.addProject(req.user.id, { ...req.body, files: req.files });
    return R.created(res, result);
  } catch (err) { return handleErr(res, err); }
}

// GET /api/exhibitors/me/projects
async function getMyProjects(req, res) {
  try {
    const list = await service.getProjectsByExhibitor(req.user.id);
    return R.ok(res, list);
  } catch (err) { return handleErr(res, err); }
}

// GET /api/exhibitors/:id/projects
async function getExhibitorProjects(req, res) {
  try {
    const list = await service.getProjectsByExhibitor(req.params.id);
    return R.ok(res, list);
  } catch (err) { return handleErr(res, err); }
}

// GET /api/exhibitors/public/all
async function getPublicList(req, res) {
  try {
    const list = await service.getApprovedExhibitors();
    return R.ok(res, list);
  } catch (err) { return handleErr(res, err); }
}

// GET /api/exhibitors/public/:id
async function getPublicDetails(req, res) {
  try {
    const details = await service.getPublicExhibitorProfile(req.params.id);
    return R.ok(res, details);
  } catch (err) { return handleErr(res, err); }
}

// GET /api/exhibitors/public/:id/projects
async function getPublicProjects(req, res) {
  try {
    const list = await service.getPublicProjectsByExhibitor(req.params.id);
    return R.ok(res, list);
  } catch (err) { return handleErr(res, err); }
}

module.exports = { 
  register, 
  getAll, 
  getMe, 
  updateStatus, 
  addProject, 
  getMyProjects, 
  getExhibitorProjects,
  getPublicList,
  getPublicDetails,
  getPublicProjects
};
