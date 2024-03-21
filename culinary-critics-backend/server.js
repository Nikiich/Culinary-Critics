const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const { logger } = require('./middleware/logEvents');
const corsOptions = require('./config/corsOption');
const connectDB = require('./config/dbConn');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials')
require('dotenv').config();
connectDB();

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/restaurant', require('./routes/restaurant'));
app.use('/refresh', require('./routes/refresh'));
app.use('/cuisine-type', require('./routes/cuisineType'))
app.use('/review', require('./routes/review'));

app.use(verifyJWT)
app.use('/api/restaurant', require('./routes/api/restaurantSecured'));
app.use('/api/review', require('./routes/api/reviewSecured'));
app.use('/api/users', require('./routes/api/user'));
app.use('/api/cuisine-type', require('./routes/api/cuisineTypeSecured'));




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

