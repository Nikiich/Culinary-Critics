const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return res.sendStatus(401);
        }
        const rolesValues = Object.values(req.roles);
        const result = rolesValues.some(roleValue => allowedRoles.includes(roleValue));
        if (!result) {
            return res.sendStatus(403);
        }
        next();
    };
};

module.exports = verifyRoles;