'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_session = sequelize.define('User_session', {
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expiry_date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});
  User_session.associate = function(models) {
    // associations can be defined here
    User_session.belongsTo(models.User,{
        foreignKey: 'user_id'
    })
  };
  return User_session;
};