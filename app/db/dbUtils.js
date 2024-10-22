// dbUtils.js
const mongoose = require('mongoose');
const db = require('./db'); // Your database configuration file
const User = require('../model/user.model'); // Your User model

const connectToDatabase = async () => {
    try {
        await mongoose.connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the database!");
    } catch (error) {
        console.error("Cannot connect to the database!", error);
        process.exit();
    }
};

const updateSchema = async () => {
    // try {
    //     // Adding a new field to all existing documents
    //     await User.updateMany({}, { $set: { newField: 'defaultValue' } });
    //     console.log('Schema updated');
    // } catch (error) {
    //     console.error('Error updating schema:', error);
    // }
};

module.exports = {
    connectToDatabase,
    updateSchema
};
