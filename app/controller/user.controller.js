const user_Service = require("../service/user.service");
const utils = require('../utils/common')

exports.createUser = async (req, res) => {
    try {
        const data = req.body
        utils.isEntitiesEmpty(data)
        const response = await user_Service.create_Service(data);
        return res.send({ response: response, message: 'User saved successfully' });
    } catch (error) {
        return res.send({ message: error.message });
    }
};
exports.getAllCards = async (req, res) => {
    try {
        // const data = req.body
        const { page = 1, limit = 10 } = req.query;
        // utils.isEntitiesEmpty(data)
        const response = await user_Service.getAll_service(page,limit);
        return res.send({ response: response, message: 'User saved successfully' });
    } catch (error) {
        return res.send({ message: error.message });
    }
}
