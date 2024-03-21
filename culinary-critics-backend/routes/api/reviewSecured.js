const express = require('express');
const router = express.Router();
const {addReview, deleteReview} = require('../../controllers/reviewController');
const validateReview = require('../../middleware/validation/reviewValidation');
const verifyRoles = require('../../middleware/verifyRoles');
const rolesList = require('../../config/rolesList');

router.post('/', validateReview.addReview, addReview);
router.delete('/:id', verifyRoles(rolesList.Admin, rolesList.Editor), deleteReview);

module.exports = router;