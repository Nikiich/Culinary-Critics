const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.DB_URI).then(() => {
        console.log('Connected to DB');
    }).catch((err) => {
        console.error(err);
    });
}
module.exports = connectDB;