const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRegistrationRouter = require('./routes/userRegistration');
const userPreferencesRouter = require('./routes/userPreferences');
dotenv.config()

const app = express();
const port = process.env.EXPRESS_API_PORT || 5000;
const mongodburl = process.env.MONGODB_URL;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRegistrationRouter);
app.use(userPreferencesRouter);

mongoose.connect(mongodburl).then(() => {
    console.log(`Connected to MongoDB!!!`);
    app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});
})





module.exports = app;