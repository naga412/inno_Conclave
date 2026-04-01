const jwt = require('jsonwebtoken');
const R   = require('../utils/response');

/** Attach decoded JWT to req.user */
const verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header?.startsWith('Bearer '))
    return R.unauthorized(res, 'No token provided');

  try {
    req.user = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    return R.forbidden(res, 'Invalid or expired token');
  }
};

/** Only admin role may proceed */
const requireAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.role !== 'admin')
      return R.forbidden(res, 'Admin access required');
    next();
  });
};

/** Only the matching participant role may proceed */
const requireParticipant = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.role !== 'participant')
      return R.forbidden(res, 'Participant access required');
    next();
  });
};

/** Only the exhibitor role may proceed */
const requireExhibitor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.role !== 'exhibitor')
      return R.forbidden(res, 'Exhibitor access required');
    next();
  });
};

module.exports = { verifyToken, requireAdmin, requireParticipant, requireExhibitor };
