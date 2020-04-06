const { getUserByID } = require('./user.flows');
const configs = require('../../config');
const userConfig = configs.user;

exports.getUser = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await getUserByID(id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await getUserByID(id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await getUserByID(id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await getUserByID(id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};