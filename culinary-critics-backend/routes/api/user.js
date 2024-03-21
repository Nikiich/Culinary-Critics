const express = require('express');
const router = express.Router();
const verifyRoles = require('../../middleware/verifyRoles');
const rolesList = require('../../config/rolesList');
const { getUserInfo, getAllUsers, getFilteredUsers, deleteUser, updateUserRoles } = require('../../controllers/userController');

router.get('/', verifyRoles(rolesList.Admin), getAllUsers);
router.get('/filter', verifyRoles(rolesList.Admin), getFilteredUsers);
router.delete('/:id', verifyRoles(rolesList.Admin), deleteUser);
router.put('/:id', verifyRoles(rolesList.Admin), updateUserRoles);

module.exports = router;