const { validationResult } = require('express-validator');
exports.validationResponse = (req, res, next)=>{
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    } else {
        next()
    }
}