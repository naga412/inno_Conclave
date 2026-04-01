const router     = require('express').Router();
const controller = require('./agenda.controller');
const { requireAdmin } = require('../../shared/middleware/auth');

router.get('/', controller.getAll);
router.post('/', requireAdmin, controller.create);
router.put('/:id', requireAdmin, controller.update);
router.delete('/:id', requireAdmin, controller.remove);

module.exports = router;
