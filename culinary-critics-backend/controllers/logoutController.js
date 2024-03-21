const User = require('../models/userModel');

const handleLogout = async (req, res, next) => {
    const cookies = req.cookies;

    if(!cookies?.jwt){
        return res.sendStatus(204)
    }
    
};