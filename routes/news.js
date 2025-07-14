const {Router} = require('express');
const { getNewsByUserPreferences } = require('../controller/newsController');
const { authenticate } = require('../middlewares/authenticate');

newsRouter = Router();

newsRouter.use(authenticate);

newsRouter.get('/', getNewsByUserPreferences);

module.exports = newsRouter;