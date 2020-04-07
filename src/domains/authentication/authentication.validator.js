const { check } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'login': {
        return [ 
            check('email', `email doesn't exists`).exists(),
            check('password', `password doesn't exists`).exists(),
        ]   
    }
  
  }
}