const db = require("../db/dbconfig");
const User = db.user;
exports.Create = async (data) => {
    try {
        const obj = {
            "name": 'subash2',
            "jobTitle": "software engineer2",
            "companyName": "aws2",
            "emailAddress": "subash2@gmail.com",
            "phoneNumber": '9085274112',
            "address": "erode2"
        }
        // const user = new User(data);
        const user = new User(obj);
        // const response = await user.save();
        return obj;
    } catch (error) {
        return error;
    }
};
exports.getAll = async (page, limit) => {
    try {
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
        };

        const cards = await User.find()
            .limit(options.limit)
            .skip((options.page - 1) * options.limit);

        const totalCards = await User.countDocuments();
        return {
            totalPages: Math.ceil(totalCards / options.limit),
            currentPage: options.page,
            cards: cards,
        }
    } catch (error) {
        return error;
    }
};

