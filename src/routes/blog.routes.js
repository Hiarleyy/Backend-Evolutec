const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', blogController.list);
router.get('/:slug', blogController.getBySlug);
router.post('/', authenticate, blogController.create);
router.put('/:id', authenticate, blogController.update);

module.exports = router;
