const User = require('../model/user');
const rolesList = require('../config/rolesList');
const getUserInfo = async (req, res) => {
  try {
    const UserInfo = await User.findOne({ "email": req.user }).select("-hashedPassword -_id -__v -refreshToken").exec();
    if (!UserInfo) {
      return res.sendStatus(404);
    }
    res.status(200).json(UserInfo);
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-hashedPassword").exec();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};

getFilteredUsers = async (req, res) => {
  try {
    const search = req.query.search;
    const query = {};

    if (search) {
      query.$or = [
        { username: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }     
      ];
    }

    const users = await User.find(query).select("-hashedPassword -__v").exec();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ 'message': 'Missing user ID' });
  }
  try {
    const user = await User.findByIdAndDelete(userId).exec();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
}

const updateUserRoles = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ 'message': 'Missing user ID' });
  }
  const roles = req.body.roles;
  if (!roles) {
    return res.status(400).json({ 'message': 'Missing roles' });
  }
  const convertedRoles = {};
  roles.forEach(role => {
    convertedRoles[role] = rolesList[role];
  });
  
  try {
    const user = await User.findById(userId).exec();
    user.roles = convertedRoles;
    await user.save();
    res.sendStatus(204);
    console.log('successfuly updated user roles');
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ 'message': err.message });
  }
}

module.exports = { getUserInfo, getAllUsers, getFilteredUsers, deleteUser, updateUserRoles };