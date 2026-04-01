const service = require('./agenda.service');
const R       = require('../../shared/utils/response');

const handleErr = (res, err) => {
  if (err.code === 400) return R.badRequest(res, err.message);
  if (err.code === 404) return R.notFound(res, err.message);
  return R.serverError(res, err);
};

async function getAll(req, res) {
  try {
    const list = await service.getAll();
    return R.ok(res, list);
  } catch (err) { return handleErr(res, err); }
}

async function create(req, res) {
  try {
    const result = await service.addEvent(req.body);
    return R.created(res, result);
  } catch (err) { return handleErr(res, err); }
}

async function update(req, res) {
  try {
    const result = await service.editEvent(req.params.id, req.body);
    return R.ok(res, result);
  } catch (err) { return handleErr(res, err); }
}

async function remove(req, res) {
  try {
    const result = await service.deleteEvent(req.params.id);
    return R.ok(res, result);
  } catch (err) { return handleErr(res, err); }
}

module.exports = { getAll, create, update, remove };
