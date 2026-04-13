const express = require('express');
const router = express.Router();
const leadController = require('../controllers/lead.controller');

router.post('/', leadController.create);

module.exports = router;
