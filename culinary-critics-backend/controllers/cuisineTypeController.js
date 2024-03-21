const CuisineType = require('../model/CuisineType');

const getAllCuisineTypes = async (req, res) => {
    try {
        const cuisineTypes = await CuisineType.find().select("name").exec();
        res.json(cuisineTypes);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

const addCuisineType = async (req, res) => {
    try {
        const cuisineType = new CuisineType(req.body);
        const newCuisineType = await cuisineType.save();
        res.status(201).json(newCuisineType);
    } catch (err) {
        res.status(400).json({ 'message': err.message });
    }
};

module.exports = { getAllCuisineTypes, addCuisineType };