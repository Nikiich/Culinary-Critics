const express = require('express');
const router = express.Router();
const { addCuisineType } = require('../../controllers/cuisineTypeController');
const validateCuisine = require('../../middleware/validation/cuisineValidation');
const verifyRoles = require('../../middleware/verifyRoles');
const rolesList = require('../../config/rolesList');

router.post('/',
  verifyRoles(rolesList.Admin, rolesList.Editor),
  validateCuisine.addCuisine,
  addCuisineType);

module.exports = router;