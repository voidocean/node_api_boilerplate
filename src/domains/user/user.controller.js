const { getUserByID, addUser, editUser, removeUser } = require('./user.flows');
const configs = require('../../config');
const userConfig = configs.user;

exports.getUser = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await getUserByID(id);
    return res.status(201).json(response);
  } catch (error) {
    console.error(error)
    return res.status(500).json(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { fullName, password, email } = req.body;
    const response = await addUser({ fullName, password, email });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error)
    return res.status(500).json(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id, fullName, email } = req.body;
    const response = await editUser({ id, fullName, email });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error)
    return res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await removeUser(id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};