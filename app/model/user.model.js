const mongoose = require('mongoose');

module.exports = mongoose => {
    const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },
        companyName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        emailAddress: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        }
    }, { timestamps: true });

    const User = mongoose.model("User", UserSchema); // Use singular form for model name

    return User;
};
