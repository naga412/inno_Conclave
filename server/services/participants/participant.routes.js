// services/participants/participant.routes.js
const router     = require('express').Router();
const controller = require('./participant.controller');
const { requireAdmin, requireParticipant } = require('../../shared/middleware/auth');
const { createUploader } = require('../../shared/middleware/upload');

const upload = createUploader('participants', 5);

/**
 * @route  POST   /api/participants/register
 * @desc   Register a new participant (photo + optional payment screenshot)
 * @access Public
 */
router.post(
  '/register',
  upload.fields([
    { name: 'photo',              maxCount: 1 },
    { name: 'payment_screenshot', maxCount: 1 },
  ]),
  controller.register
);

/**
 * @route  GET    /api/participants
 * @desc   List all participants
 * @access Admin
 */
router.get('/', requireAdmin, controller.getAll);

/**
 * @route  GET    /api/participants/export
 * @desc   Download all participants as .txt
 * @access Admin
 */
router.get('/export', requireAdmin, controller.exportCSV);

/**
 * @route  GET    /api/participants/me
 * @desc   Get current participant's profile
 * @access Participant
 */
router.get('/me', requireParticipant, controller.getMe);

/**
 * @route  PATCH  /api/participants/me
 * @desc   Update participant's profile (name, phone, college, department)
 * @access Participant
 */
router.patch('/me', requireParticipant, controller.updateProfile);

/**
 * @route  PATCH  /api/participants/me/photo
 * @desc   Update participant's profile photo
 * @access Participant
 */
router.patch('/me/photo', requireParticipant, upload.single('photo'), controller.updatePhoto);

/**
 * @route  PATCH  /api/participants/:id/lunch
 * @desc   Confirm or reset lunch payment status
 * @access Admin
 */
router.patch('/:id/lunch', requireAdmin, controller.updateLunch);

/**
 * @route  DELETE /api/participants/:id
 * @desc   Remove a participant
 * @access Admin
 */
router.delete('/:id', requireAdmin, controller.remove);

module.exports = router;
