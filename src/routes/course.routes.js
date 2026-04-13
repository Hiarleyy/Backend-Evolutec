const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', courseController.list);
router.get('/:slug', courseController.getBySlug);
router.post('/', authenticate, courseController.create);
router.put('/:id', authenticate, courseController.update);
router.delete('/:id', authenticate, courseController.remove);

module.exports = router;
