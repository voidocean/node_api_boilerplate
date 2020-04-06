'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
   

  }, {
    freezeTableName: true,
    tableName: 'user'
  });
  User.associate = ({ }) => {
    // associations can be defined here
   
    
  };
  return User;
};
