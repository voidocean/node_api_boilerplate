const { check } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'getUser': {
        return [ 
            check('id', `id doesn't exists`).exists().isNumeric().withMessage('id is not a number'),
        ]   
    }
    case 'createUser': {
        return [ 
            check('fullName', `fullName doesn't exists`).exists(),
            check('email', 'Invalid email').exists().isEmail(),
            check('password', `password doesn't exists`).exists(),
        ]   
    }
    case 'updateUser': {
        return [ 
            check('id', `id doesn't exists`).exists().isNumeric().isNumeric().withMessage('id is not a number'),
            check('fullName', `fullName doesn't exists`).exists(),
            check('email', 'Invalid email').exists().isEmail(),
        ]   
    }
    case 'deleteUser': {
        return [ 
            check('id', `id doesn't exists`).exists().isNumeric().withMessage('id is not a number'),
        ]   
    }
  }
}