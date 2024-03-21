const express = require('express');
const router = express.Router();
const {getAllReviews} = require('../controllers/reviewController');

router.route('/:id')
.get(getAllReviews);

module.exports = router;