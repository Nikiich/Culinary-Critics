const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const handleLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ 'message': 'Missing required fields' });
    }
    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }
    const match = await bcrypt.compare(password, foundUser.hashedPassword);
    if (match) {
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    email: foundUser.email,
                    roles: foundUser.roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
        );
        const refreshToken = jwt.sign(
            { email: foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 24 });
        res.json({
            accessToken,
            "userData": {
                "username": foundUser.username,
                "email": foundUser.email,
                "roles": foundUser.roles,
                "id": foundUser._id
            }
        });
        } else {
        res.sendStatus(401);
    }
};

module.exports = { handleLogin };