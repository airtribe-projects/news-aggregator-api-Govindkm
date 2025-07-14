const { addUserPreferences, getUserPreferences, updateUserPreferences, deleteUserPreferences } = require('../controller/preferencesController');
const { getNewsByUserPreferences } = require('../controller/newsController');
const userPreferencesRouter = require('express').Router();
const { authenticate } = require('../middlewares/authenticate');
userPreferencesRouter.use(authenticate);

userPreferencesRouter.get('/preferences', getUserPreferences);
userPreferencesRouter.post('/preferences', addUserPreferences);
userPreferencesRouter.put('/preferences', updateUserPreferences);
userPreferencesRouter.delete('/preferences', deleteUserPreferences);
userPreferencesRouter.get('/news', getNewsByUserPreferences);

module.exports = userPreferencesRouter;