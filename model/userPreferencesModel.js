const mongoose = require('mongoose');
const validator = require('validator');

const preferenceSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categories: {
        type: [String],
        enum: ['Technology', 'Health', 'Sports', 'Entertainment', 'Business', 'Science', 'Politics'],
        default: []
    },
    languages: {
        type: [String],
        enum: ['English', 'Spanish', 'French', 'German', 'Chinese', "Hindi"],
        default: []
    },
    countries: {
        type: [String],
        enum: ['US', 'UK', 'IN', 'CA', 'AU'],
        default: ['IN'],
    }
});

preferenceSchema.pre('save', async function (next) {
    if (this.isModified('categories') && !this.categories.length) {
        throw new Error('At least one category must be selected');
    }
    if (this.isModified('languages') && !this.languages.length) {
        throw new Error('At least one language must be selected');
    }
    if (this.isModified('countries') && !this.countries.length) {
        throw new Error('At least one country must be selected');
    }
    next();
});

const UserPreferencesModel = mongoose.model('UserPreferences', preferenceSchema);

module.exports = UserPreferencesModel;