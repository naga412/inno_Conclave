// services/workshops/workshop.controller.js
const service = require('./workshop.service');
const R       = require('../../shared/utils/response');

const handleErr = (res, err) => {
  if (err.code === 400) return R.badRequest(res, err.message);
  if (err.code === 404) return R.notFound(res, err.message);
  if (err.code === 409) return R.conflict(res, err.message);
  return R.serverError(res, err);
};

// GET /api/workshops
async function getAll(req, res) {
  try {
    const list = await service.listAll();
    return R.ok(res, list);
  } catch (err) { return handleErr(res, err); }
}

// POST /api/workshops
async function create(req, res) {
  try {
    const workshop = await service.createWorkshop(req.body);
    return R.created(res, workshop);
  } catch (err) { return handleErr(res, err); }
}

// PUT /api/workshops/:id
async function update(req, res) {
  try {
    const workshop = await service.updateWorkshop(req.params.id, req.body);
    return R.ok(res, workshop);
  } catch (err) { return handleErr(res, err); }
}

// DELETE /api/workshops/:id
async function remove(req, res) {
  try {
    const result = await service.deleteWorkshop(req.params.id);
    return R.ok(res, result);
  } catch (err) { return handleErr(res, err); }
}

// POST /api/workshops/:id/register
async function enroll(req, res) {
  try {
    const result = await service.enrollParticipant(req.user.id, req.params.id);
    return R.created(res, result);
  } catch (err) { return handleErr(res, err); }
}

// GET /api/workshops/:id/registrations
async function getRegistrants(req, res) {
  try {
    const list = await service.getWorkshopParticipants(req.params.id);
    return R.ok(res, list);
  } catch (err) { return handleErr(res, err); }
}

// GET /api/workshops/my-registrations
async function getMyRegistrations(req, res) {
  try {
    const list = await service.getMyWorkshops(req.user.id);
    return R.ok(res, list);
  } catch (err) { return handleErr(res, err); }
}

module.exports = { 
  getAll, 
  create, 
  update, 
  remove,
  enroll,
  getRegistrants,
  getMyRegistrations
};
