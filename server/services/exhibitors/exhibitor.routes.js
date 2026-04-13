// services/exhibitors/exhibitor.routes.js
const router     = require('express').Router();
const controller = require('./exhibitor.controller');
const { requireAdmin, requireExhibitor } = require('../../shared/middleware/auth');
const { createUploader } = require('../../shared/middleware/upload');

const upload = createUploader('exhibitors', 10);

/**
 * @route  POST   /api/exhibitors/register
 * @desc   Register a new exhibitor (poster + payment proof uploads)
 * @access Public
 */
router.post(
  '/register',
  upload.fields([
    { name: 'poster',        maxCount: 1 },
    { name: 'payment_proof', maxCount: 1 },
  ]),
  controller.register
);

/**
 * @route  GET    /api/exhibitors/public/all
 * @desc   List all approved exhibitors for public display
 * @access Public
 */
router.get('/public/all', controller.getPublicList);

/**
 * @route  GET    /api/exhibitors/public/:id
 * @desc   Get specific approved exhibitor
 * @access Public
 */
router.get('/public/:id', controller.getPublicDetails);

/**
 * @route  GET    /api/exhibitors/public/:id/projects
 * @desc   Get projects for specific approved exhibitor
 * @access Public
 */
router.get('/public/:id/projects', controller.getPublicProjects);

/**
 * @route  GET    /api/exhibitors
 * @desc   List all exhibitors
 * @access Admin
 */
router.get('/', requireAdmin, controller.getAll);

/**
 * @route  GET    /api/exhibitors/me
 * @desc   Get current exhibitor's profile
 * @access Exhibitor
 */
router.get('/me', requireExhibitor, controller.getMe);

/**
 * @route  PATCH  /api/exhibitors/:id/status
 * @desc   Approve / reject / reset an exhibitor
 * @access Admin
 */
router.patch('/:id/status', requireAdmin, controller.updateStatus);

/**
 * @route  POST   /api/exhibitors/me/projects
 * @desc   Add a new project (up to 5 images)
 * @access Exhibitor
 */
router.post('/me/projects', requireExhibitor, upload.array('images', 5), controller.addProject);

/**
 * @route  GET    /api/exhibitors/me/projects
 * @desc   Get current exhibitor's projects
 * @access Exhibitor
 */
router.get('/me/projects', requireExhibitor, controller.getMyProjects);

/**
 * @route  GET    /api/exhibitors/:id/projects
 * @desc   Get a specific exhibitor's projects
 * @access Admin
 */
router.get('/:id/projects', requireAdmin, controller.getExhibitorProjects);

/**
 * @route  POST   /api/exhibitors/me/team
 * @desc   Add a team member (optional photo upload)
 * @access Exhibitor
 */
router.post('/me/team', requireExhibitor, upload.fields([{ name: 'photo', maxCount: 1 }]), controller.addTeamMember);

/**
 * @route  GET    /api/exhibitors/me/team
 * @desc   Get current exhibitor's team members
 * @access Exhibitor
 */
router.get('/me/team', requireExhibitor, controller.getMyTeam);

/**
 * @route  DELETE /api/exhibitors/me/team/:memberId
 * @desc   Remove a team member
 * @access Exhibitor
 */
router.delete('/me/team/:memberId', requireExhibitor, controller.removeTeamMember);

/**
 * @route  GET    /api/exhibitors/:id/team
 * @desc   Get any exhibitor's team members
 * @access Admin
 */
router.get('/:id/team', requireAdmin, controller.getExhibitorTeam);

module.exports = router;
