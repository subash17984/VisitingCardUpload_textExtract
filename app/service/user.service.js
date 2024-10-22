const user_Repository = require("../repository/user.repository");
exports.create_Service = async (data) => {
    try {
        const response = await user_Repository.Create(data);
        return response;
    } catch (error) {
        return error;
    }
};
exports.getAll_service = async (page,limit) => {
    try {
        const response = await user_Repository.getAll(page,limit);
        return response;
    } catch (error) {
        return error;
    }
}