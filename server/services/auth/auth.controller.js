// services/auth/auth.controller.js
const authService = require('./auth.service');
const R           = require('../../shared/utils/response');

async function login(req, res) {
  const { email, password, role } = req.body;
  if (!email || !password || !role)
    return R.badRequest(res, 'email, password and role are required');

  try {
    const result = await authService.loginUser({ email, password, role });
    return R.ok(res, result);
  } catch (err) {
    if (err.code === 400) return R.badRequest(res, err.message);
    if (err.code === 401) return R.unauthorized(res, err.message);
    if (err.code === 403) return R.forbidden(res, err.message);
    return R.serverError(res, err);
  }
}

module.exports = { login };
