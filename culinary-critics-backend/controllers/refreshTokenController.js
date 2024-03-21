const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const handleRefreshToken = async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.email !== decoded.email) {
            return res.sendStatus(401);
        }
        const accessToken = jwt.sign({ email: foundUser.email, roles: foundUser.roles }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
        res.json({ accessToken })

    })
};

module.exports = { handleRefreshToken };