const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unit.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', unitController.list);
router.post('/', authenticate, unitController.create);

module.exports = router;
