const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String, required: true, unique: true, trim: true, lowercase: true
    },
    password: {
        type: String, required: true
    },
    preferences:{
        type: [String],
        enum: ['movies', 'comics', 'music', 'sports', 'news', 'games' ],
        default:[]
    }
});

userSchema.pre('save', async function (next) {
    if(!validator.isStrongPassword(this.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })) {
        throw new Error('Password is not strong enough');
    }
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;