const {getNews} = require('../services/newsApiServices');

const getNewsByUserPreferences = async (req, res) => {
    try {
        const news = await getNews(req);
        if (!news || news.length === 0) {
            return res.status(404).send({ message: 'No news articles found for the user preferences' });
        }
        console.log({news});
        res.status(200).send({news});
    } catch (error) {
        console.error(`Error while fetching news by user preferences: ${error}`);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}

module.exports = { getNewsByUserPreferences };