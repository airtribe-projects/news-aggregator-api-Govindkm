const UserPreferencesModel = require('../model/userModel');

const getUserPreferences = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await UserPreferencesModel.findOne({ _id: userId });
        const preferences = user ? user.preferences : null;
        if (!preferences) {
            return res.status(404).send({ message: 'Preferences not found' });
        }
        res.status(200).send({ preferences });
    } catch (error) {
        console.error(`Error while fetching user preferences: ${error}`);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const addUserPreferences = async (req, res) => {
    try {
        const userId = req.user.userId;

        const existingPreferences = await UserPreferencesModel.findOne({ _id:userId });
        if (existingPreferences) {
            return res.status(400).send({ message: 'Preferences already exist for this user'});
        }

        const { preferences } = req.body;
        existingPreferences.preferences = [...preferences, ...existingPreferences.preferences];
        await existingPreferences.save();
        res.status(201).send(existingPreferences);
    } catch (error) {
        console.error(`Error while adding user preferences: ${error}`);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const updateUserPreferences = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { preferences } = req.body;
        const preferencesData = await UserPreferencesModel.findOneAndUpdate(
            { _id: userId },
            { preferences },
            { new: true, runValidators: true }
        );
        if (!preferencesData) {
            return res.status(404).send({ message: 'Preferences not found' });
        }
        res.status(200).send(preferencesData);
    } catch (error) {
        console.error(`Error while updating user preferences: ${error}`);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const deleteUserPreferences = async (req, res) => {
    try {
        const userId = req.user.userId;
        const preferences = await UserPreferencesModel.findOneAndDelete({ _id: userId });
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