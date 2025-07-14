const axios = require('axios');
const UserPreferencesModel  = require('../model/userModel');
const dotenv = require('dotenv');
dotenv.config();
const newsApiUrl = process.env.NEWSAPI_URL || "https://newsapi.org/v2/";
const apikey = process.env.NEWSAPI_KEY;

const getNews = async (req) => {
    try {
        const userId = req.user.userId;
        const { preferences } = await UserPreferencesModel.findOne({ _id: userId });
        if (!preferences) {
            throw new Error('User preferences not found');
        }        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        if(limit > 100) {
            throw new Error('Limit cannot be more than 100');
        }
        if(page < 1) {
            throw new Error('Page number cannot be less than 1');
        }
        const url = `${newsApiUrl}top-headlines?language=en&pageSize=${limit}&page=${page}&apiKey=${apikey}`; 
        console.log(`NEWS API URL: ${url}`);
        const response = await axios.get(url);
        console.log(`Fetched news for userId ${userId} with preferences ${preferences.join(', ')}`);
        if (response.data.status !== 'ok') {
            throw new Error('Failed to fetch news articles');
        }
        return response.data.articles;
    } catch (error) {
        console.error(`Error while fetching news: ${error}`);
    }
};

module.exports = {
    getNews
};
