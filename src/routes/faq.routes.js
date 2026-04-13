const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faq.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', faqController.list);
router.post('/', authenticate, faqController.create);
router.put('/:id', authenticate, faqController.update);
router.delete('/:id', authenticate, faqController.remove);

module.exports = router;
