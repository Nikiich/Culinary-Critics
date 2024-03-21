const express = require('express');
const router = express.Router();
const { getAllCuisineTypes } = require('../controllers/cuisineTypeController');

router.get('/', getAllCuisineTypes);

module.exports = router;