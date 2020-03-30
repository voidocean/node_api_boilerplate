const { getUser } = require('./user.services');

exports.getUserByID = async (id) => {
    // step1
    const user = getUser({ id: id });
    // step2
    // step3
    // step4
    return user;
};
