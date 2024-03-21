const express = require('express');
const router = express.Router();
const { getAllRestaurants, getRestaurantById, addRestaurant } = require('../controllers/restaurantController');

router.route('/')
.get(getAllRestaurants);

router.route('/:id')
.get(getRestaurantById);

module.exports = router;