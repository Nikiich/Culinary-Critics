const Review = require('../model/Review');
const Restaurant = require('../model/Restaurant');

const getAllReviews = async (req, res) => {
  const  restaurantId  = req.params.id;
  console.log(restaurantId);
  try {
    const reviews = await Review.find({ restaurant: restaurantId })
    .populate('user', 'username _id').exec();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};

const addReview = async (req, res) => {
  console.log(req.body);
  try {
    const review = new Review(req.body);
    const newReview = await review.save();
    res.status(201).json(newReview);
    const restaurant = await Restaurant.findById(req.body.restaurant).exec();
    restaurant.reviews.push(newReview._id);
    await updateRating(restaurant._id);
    await restaurant.save();
  } catch (err) {
    res.status(400).json({ 'message': err.message });
    console.log({ 'message': err.message });
  }
}

const deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  if (!reviewId) {
    return res.status(400).json({ 'message': 'Missing review ID' });
  }
  try {
    const review = await Review.findByIdAndDelete(reviewId).exec();
    await updateRating(review.restaurant);
    const restaurant = await Restaurant.findById(review.restaurant).exec();
    restaurant.reviews.pull(reviewId);
    await restaurant.save();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};

const updateRating = async (restaurantId) => {
  const reviews = await Review.find({ restaurant: restaurantId }).exec();
  const restaurant = await Restaurant.findById(restaurantId).exec();
  if (reviews.length === 0) {
    restaurant.rating = 0;
    await restaurant.save();
    return;
  }
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  restaurant.rating = totalRating / reviews.length;
  await restaurant.save();
};

module.exports = {getAllReviews, addReview, deleteReview};