const bcrypt = require('bcrypt');

const User = require('../model/user');

const handleNewUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ 'message': 'Missing required fields' });
    }

    const dublicate = await User.findOne({ email: email }).exec();
    if (dublicate) {
        console.log(dublicate);
        return res.status(409).json({"message": "email is already used"}); //conflict
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            email: email,
            hashedPassword: hashedPassword,
        });

        console.log(newUser);
        
        res.status(201).json({ 'message': `User ${newUser.username} created` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

module.exports = {handleNewUser};