const bcryptjs = require('bcryptjs')
const { User } = require('../../models')
const { saltRounds } = require('../../config/user')
exports.encryptPassword = async (password)=>{
    const encryptedPassword = await bcryptjs.hash(password, saltRounds);
    return encryptedPassword
}
exports.fetchUser= async (id) => {
    
    const user = await User.findOne({ 
        where: { id: id },
        attributes: { exclude: ['password'] } 
    });

    return user
    
}

exports.insertUser = async ({fullName, password, email}) =>{
    
    const new_data = { fullName, email, password }
    const new_user = await User.create(new_data)

    return new_user
}

exports.updateUser = async (id, {fullName, email}) => {
    const new_data = { fullName, email }
    const result = await User.update(new_data, { where: { id: id } })
    return result
}

exports.deleteUser= async (id) => {
    
    const user = await User.destroy({ where: { id: id } });

    return user
    
}