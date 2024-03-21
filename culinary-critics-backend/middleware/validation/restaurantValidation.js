const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const CuisineType = require('../../model/CuisineType');
const validateRestaurant = {
  addRestaurant: [
    body('name')
      .notEmpty()
      .trim()
      .withMessage('Restaurant name is required.')
      .isLength({ min: 2 })
      .withMessage('Restaurant name must be at least 2 characters long.'),
    body('address')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Address is required.')
      .isLength({ min: 5 })
      .withMessage('Address must be at least 5 characters long.'),
    body('location.city')
      .notEmpty()
      .trim()
      .not()
      .isEmpty()
      .withMessage('Location city is required.')
      .isLength({ min: 3 })
      .withMessage('Location city must be at least 3 characters long.'),
    body('location.country')
      .notEmpty()
      .trim()
      .not()
      .isEmpty()
      .withMessage('Location country is required.')
      .isLength({ min: 3 })
      .withMessage('Location country must be at least 3 characters long.'),

    body('cuisineType')
      .isArray().withMessage('Cuisine Type must be an array.')
      .not().isEmpty().withMessage('At least one Cuisine Type is required.')
      .custom(async (cuisineTypes) => {
        for (const type of cuisineTypes) {
          if (!mongoose.Types.ObjectId.isValid(type)) {
            throw new Error(`Cuisine Type ${type} is not a valid ObjectId.`);
          }
  
          const cuisineTypeExists = await CuisineType.findById(type).exec();
          console.log(cuisineTypeExists);
          if (!cuisineTypeExists) {
            throw new Error(`Cuisine Type ${type} does not exist.`);
          }
        }
        return true;
      }),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],
};

module.exports =  validateRestaurant ;
