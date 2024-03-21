const { body, validationResult } = require('express-validator');
const Restaurant = require('../../model/Restaurant');
const User = require('../../model/user');
const mongoose = require('mongoose');

const validateReview = {
  addReview: [
    body('restaurant')
      .notEmpty().withMessage('Restaurant ID is required.')
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage('Invalid restaurant ID.')
      .custom(async (value) => {
        const restaurant = await Restaurant.findById(value).exec();
        if (!restaurant) {
          return Promise.reject('Restaurant does not exist.');
        }
      }),

    body('user')
      .notEmpty().withMessage('User ID is required.')
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage('Invalid user ID.')
      .custom(async (value) => {
        const user = await User.findById(value).exec();
        if (!user) {
          return Promise.reject('User does not exist.');
        }
      }),

    body('name')
      .notEmpty().withMessage('Name is required.')
      .trim().escape(),

    body('review')
      .notEmpty().withMessage('Review text is required.')
      .trim().escape(),

    body('rating')
      .notEmpty().withMessage('Rating is required.')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be an integer between 1 and 5.'),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }

  ]
}

module.exports = validateReview;