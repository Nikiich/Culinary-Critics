const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: undefined,
    },
    location: {
        city:{
            type: String,
            required: true,
        },
        country:{
            type: String,
            required: true,
        },
    },
    cuisineType: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CuisineType',
        required: true,
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true,
    }],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);