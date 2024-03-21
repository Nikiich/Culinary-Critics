const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const userValidation = require('../middleware/validation/userValidation');

router.post('/', userValidation.registration, registerController.handleNewUser);

module.exports = router;