const UserPreferencesModel = require("../model/userPreferencesModel");

const getUserPreferences = async (req, res) => {
    try {
        const userId = req.user.userId;
        const preferences = await UserPreferencesModel.findOne({ userId });
        if (!preferences) {
            return res.status(404).send({ message: 'Preferences not found' });
        }
        res.status(200).send(preferences);
    } catch (error) {
        console.error(`Error while fetching user preferences: ${error}`);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const addUserPreferences = async (req, res) => {
    try {
        const userId = req.user.userId;

        const existingPreferences = await UserPreferencesModel.findOne({ userId });
        if (existingPreferences) {
            return res.status(400).send({ message: 'Preferences already exist for this user'});
        }

        const { categories, countries, languages } = req.body;
        const preferences = new UserPreferencesModel({ userId, categories, countries, languages });
        await preferences.save();
        res.status(201).send(preferences);
    } catch (error) {
        console.error(`Error while adding user preferences: ${error}`);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const updateUserPreferences = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { categories, languages, countries } = req.body;
        const preferences = await UserPreferencesModel.findOneAndUpdate(
            { userId },
            { categories, languages, countries },
            { new: true, runValidators: true }
        );
        if (!preferences) {
            return res.status(404).send({ message: 'Preferences not found' });
        }
        res.status(200).send(preferences);
    } catch (error) {
        console.error(`Error while updating user preferences: ${error}`);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const deleteUserPreferences = async (req, res) => {
    try {
        const userId = req.user.userId;
        const preferences = await UserPreferencesModel.findOneAndDelete({ userId });
        if (!preferences) {
            return res.status(404).send({ message: 'Preferences not found' });
        }
        res.status(200).send({ message: 'Preferences deleted successfully' });
    } catch (error) {
        console.error(`Error while deleting user preferences: ${error}`);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getUserPreferences,
    addUserPreferences,
    updateUserPreferences,
    deleteUserPreferences
};