const express = require('express');
const router = express.Router();
const {addRestaurant, deleteRestaurant} = require('../../controllers/restaurantController');
const validateRestaurant = require('../../middleware/validation/restaurantValidation');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/rolesList');

router.post('/', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), validateRestaurant.addRestaurant, addRestaurant);
router.delete('/:id', verifyRoles(ROLES_LIST.Admin), deleteRestaurant);

module.exports = router;