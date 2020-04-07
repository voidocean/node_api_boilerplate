const { validationResult } = require('express-validator');

const { getUserByID, addUser, editUser, removeUser } = require('./user.flows');
const configs = require('../../config');
const userConfig = configs.user;

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await getUserByID(id);
    if(model){
      return res.status(200).json(model);
    } else {
      return res.status(404).json({});
    }
  } catch (error) {
    next(error)
    
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { fullName, password, email } = req.body;
    const model = await addUser({ fullName, password, email });
    return res.status(200).json(model);
  } catch (error) {
    next(error)
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullName, email } = req.body;
    const did_update = await editUser({ id, fullName, email });
    if(did_update){
      return res.status(200).json({ message: 'Update Successfully' });
    } else {
      return res.status(404).json( {message: 'Update Failed' });
    }
  } catch (error) {
    next(error)
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const did_delete = await removeUser(id);
    if(did_delete){
      return res.status(200).json({message: 'Delete Successfully'});
    } else {
      return res.status(404).json({message: 'Delete Failed'});
    }
    
  } catch (error) {
    next(error)
  }
};