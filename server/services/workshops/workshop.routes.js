// services/workshops/workshop.routes.js
const router     = require('express').Router();
const controller = require('./workshop.controller');
const { requireAdmin, requireParticipant } = require('../../shared/middleware/auth');

/**
 * @route  GET    /api/workshops
 * @desc   List all workshops
 * @access Public
 */
router.get('/', controller.getAll);

/**
 * @route  POST   /api/workshops
 * @desc   Create a new workshop
 * @access Admin
 */
router.post('/', requireAdmin, controller.create);

/**
 * @route  PUT    /api/workshops/:id
 * @desc   Update an existing workshop
 * @access Admin
 */
router.put('/:id', requireAdmin, controller.update);

/**
 * @route  DELETE /api/workshops/:id
 * @desc   Delete a workshop
 * @access Admin
 */
router.delete('/:id', requireAdmin, controller.remove);

/**
 * @route  POST   /api/workshops/:id/register
 * @desc   Register logged-in user for a workshop
 * @access Participant
 */
router.post('/:id/register', requireParticipant, controller.enroll);

/**
 * @route  GET    /api/workshops/my-registrations
 * @desc   Get logged-in user's registered workshops
 * @access Participant
 */
router.get('/my-registrations', requireParticipant, controller.getMyRegistrations);

/**
 * @route  GET    /api/workshops/:id/registrations
 * @desc   Get list of participants registered for a workshop
 * @access Admin
 */
router.get('/:id/registrations', requireAdmin, controller.getRegistrants);

module.exports = router;
