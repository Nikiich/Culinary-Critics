const Restaurant = require('../model/Restaurant');
const CuisineType = require('../model/CuisineType');

const getAllRestaurants = async (req, res) => {
    let query = {};
    const { city, country, rating, cuisineType } = req.query;

    if (city) {
        query["location.city"] = city;
    }
    if (country) {
        query["location.country"] = country;
    }
    if (rating) {
        query.rating = { $gte: rating }; // $gte означает 'больше или равно'
    }
    if (cuisineType) {
        query["cuisineType"] = { $in: [cuisineType] };
    }

    try {
        console.log(query);
        const restaurants = await Restaurant.find(query).populate('cuisineType').exec(); //populate('cuisineType')
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate('cuisineType').exec();
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const addRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        const newRestaurant = await restaurant.save();
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(400).json({ 'message': err.message });
    }
};

const deleteRestaurant = async (req, res) => {
    const restaurantId = req.params.id;
    if (!restaurantId) {
        return res.status(400).json({ 'message': 'Missing restaurant ID' });
    }
    try {
        const restaurant = await Restaurant.findByIdAndDelete(restaurantId).exec();
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { getAllRestaurants, getRestaurantById, addRestaurant, deleteRestaurant };