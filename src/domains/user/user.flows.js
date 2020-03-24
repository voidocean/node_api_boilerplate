const { getUser } = require('./user.services')

exports.getUserByID = async(id) => {
    const user = getUser({ id: id });
    return user;
}