const {body, validationResult} = require('express-validator');

const validateUser = {
  registration:[
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required.')
      .isLength({min: 6})
      .withMessage('Username must be at least 6 characters long.'),
    body('email')
      .notEmpty()
      .withMessage('Email is required.')
      .isEmail()
      .withMessage('Email must be valid.'),
    body('password')
      .notEmpty()
      .withMessage('Password is required.')
      .isLength({min: 6})
      .withMessage('Password must be at least 6 characters long.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
      }
      next();
    }
  ]
};

module.exports = validateUser;