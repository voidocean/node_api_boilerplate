const { fetchUser, insertUser, updateUser, deleteUser, encryptPassword } = require('./user.services');

exports.getUserByID = async (id) => {
    const result = await fetchUser(id);
    return result;
};

exports.addUser = async ({fullName, password, email}) => {
    // step1
    const new_data = {
        fullName,
        email,
        password: await encryptPassword(password)
    };
    // step2
    const result = await insertUser(new_data);

    return result;
};

exports.editUser = async ({ id, fullName, email}) => {

    const update_data = {
        fullName,
        email
    };
    const is_updated = await updateUser(id, update_data)
    let result = { message: "failed" }
    if(is_updated){
        result.message = "successful"
    }
    return result

}

exports.removeUser = async (id) => {
    
    const result = await deleteUser( id);

    return result;
};