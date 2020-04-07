const { validationResult } = require('express-validator');

const { getUserByID, addUser, editUser, removeUser } = require('./user.flows');
const configs = require('../../config');
const userConfig = configs.user;

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await getUserByID(id);
    if(response){
      return res.status(200).json(response);
    } else {
      return res.status(404).json(response);
    }
    
  } catch (error) {
    next(error)
    
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { fullName, password, email } = req.body;
    const response = await addUser({ fullName, password, email });
    return res.status(200).json(response);
  } catch (error) {
    next(error)
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id, fullName, email } = req.body;
    const response = await editUser({ id, fullName, email });
    if(response){
      return res.status(200).json({message: 'Update Successfully'});
    } else {
      return res.status(404).json({message: 'Update Failed'});
    }
  } catch (error) {
    next(error)
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await removeUser(id);
    if(response){
      return res.status(200).json({message: 'Delete Successfully'});
    } else {
      return res.status(404).json({message: 'Delete Failed'});
    }
    
  } catch (error) {
    next(error)
  }
};