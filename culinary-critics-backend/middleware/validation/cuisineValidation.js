const {body, validationResult} = require('express-validator');

const validateCuisine = {
  addCuisine: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Cuisine name is required.')
      .isLength({min: 2})
      .withMessage('Cuisine name must be at least 2 characters long.'),
      body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required.')
      .isLength({min: 5})
      .withMessage('Description must be at least 5 characters long.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
      }
      next();
    }
  ]
};

module.exports = validateCuisine;