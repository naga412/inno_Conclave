/**
 * Standardised API response helpers
 * Usage: res.success(data) / res.error(msg, code)
 */

const ok = (res, data = {}, statusCode = 200) =>
  res.status(statusCode).json({ success: true, data });

const created = (res, data = {}) =>
  res.status(201).json({ success: true, data });

const badRequest = (res, message = 'Bad request') =>
  res.status(400).json({ success: false, error: message });

const unauthorized = (res, message = 'Unauthorized') =>
  res.status(401).json({ success: false, error: message });

const forbidden = (res, message = 'Forbidden') =>
  res.status(403).json({ success: false, error: message });

const notFound = (res, message = 'Not found') =>
  res.status(404).json({ success: false, error: message });

const conflict = (res, message = 'Conflict') =>
  res.status(409).json({ success: false, error: message });

const serverError = (res, err) => {
  console.error('[SERVER ERROR]', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
};

module.exports = { ok, created, badRequest, unauthorized, forbidden, notFound, conflict, serverError };
