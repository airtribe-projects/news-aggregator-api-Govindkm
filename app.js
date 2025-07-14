const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRegistrationRouter = require('./routes/userRegistration');
const userPreferencesRouter = require('./routes/userPreferences');
const { authenticate } = require('./middlewares/authenticate');
const newsRouter = require('./routes/news');
dotenv.config()

const app = express();
const port = process.env.EXPRESS_API_PORT || 5000;
const mongodburl = process.env.MONGODB_URL;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users/', [userRegistrationRouter, userPreferencesRouter]);
app.use('/news', newsRouter);

mongoose.connect(mongodburl).then(() => {
    console.log(`Connected to MongoDB!!!`);
    app.listen(port, (err) => {
    if (err) {
        console.log('Something bad happened', err);
        process.exit(1);
    }
    console.log(`Server is listening on ${port}`);
});
})





module.exports = app;