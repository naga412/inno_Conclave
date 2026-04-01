// services/participants/participant.controller.js
const service = require('./participant.service');
const R       = require('../../shared/utils/response');

const handleErr = (res, err) => {
  if (err.code === 400) return R.badRequest(res, err.message);
  if (err.code === 401) return R.unauthorized(res, err.message);
  if (err.code === 403) return R.forbidden(res, err.message);
  if (err.code === 404) return R.notFound(res, err.message);
  if (err.code === 409) return R.conflict(res, err.message);
  return R.serverError(res, err);
};

// POST /api/participants/register
async function register(req, res) {
  try {
    const result = await service.register({
      ...req.body,
      screenshotFile: req.files?.payment_screenshot?.[0] || null,
      photoFile:      req.files?.photo?.[0] || null,
    });
    return R.created(res, result);
  } catch (err) { return handleErr(res, err); }
}

// GET /api/participants
async function getAll(req, res) {
  try {
    const list = await service.getAllParticipants();
    return R.ok(res, list);
  } catch (err) { return handleErr(res, err); }
}

// GET /api/participants/me
async function getMe(req, res) {
  try {
    const profile = await service.getMyProfile(req.user.id);
    return R.ok(res, profile);
  } catch (err) { return handleErr(res, err); }
}

// PATCH /api/participants/:id/lunch
async function updateLunch(req, res) {
  try {
    const result = await service.confirmLunch(req.params.id, req.body.status);
    return R.ok(res, result);
  } catch (err) { return handleErr(res, err); }
}

// DELETE /api/participants/:id
async function remove(req, res) {
  try {
    const result = await service.removeParticipant(req.params.id);
    return R.ok(res, result);
  } catch (err) { return handleErr(res, err); }
}

// GET /api/participants/export  (admin)
async function exportCSV(req, res) {
  try {
    const text = await service.exportAll();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="IC2026_Participants.csv"');
    return res.send(text);
  } catch (err) { return handleErr(res, err); }
}

// PATCH /api/participants/me/photo
async function updatePhoto(req, res) {
  try {
    const result = await service.updatePhoto(req.user.id, req.file);
    return R.ok(res, result);
  } catch (err) { return handleErr(res, err); }
}

// PATCH /api/participants/me
async function updateProfile(req, res) {
  try {
    const result = await service.updateProfile(req.user.id, req.body);
    return R.ok(res, result);
  } catch (err) { return handleErr(res, err); }
}

module.exports = { register, getAll, getMe, updateLunch, remove, exportCSV, updatePhoto, updateProfile };
