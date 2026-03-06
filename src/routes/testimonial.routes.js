const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', testimonialController.list);
router.post('/', authenticate, testimonialController.create);

module.exports = router;
