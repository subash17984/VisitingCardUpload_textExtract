function isEntitiesEmpty(data) {
    try {
        const body = data;
        if (Object.keys(body).length === 0) {
            throw Error("Data is not found");
        }
    } catch (error) {
        return error
    }
}

module.exports = { isEntitiesEmpty }