const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const upload = require('../middlewares/upload.middleware');

router.post('/', upload.single('cv'), jobController.create);

module.exports = router;
