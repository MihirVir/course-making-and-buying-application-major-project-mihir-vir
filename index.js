const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');

require('dotenv').config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors())
app.use(cookieParser())
app.use('/auth', authRoutes);
app.use('/course', courseRoutes);

const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {}, () => {
    console.log('Yo we are connected to the database')
})
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})