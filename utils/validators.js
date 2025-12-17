const { body } = require('express-validator');

// USER REGISTER VALIDATION
exports.registerValidator = [
  body('name').notEmpty().withMessage("Name required"),
  body('phone').notEmpty().withMessage("Phone required"),
  body('password').isLength({ min: 4 }).withMessage("Password min 4 chars"),
];

// LOGIN VALIDATION
exports.loginValidator = [
  body('phone').notEmpty().withMessage("Phone required"),
  body('password').notEmpty().withMessage("Password required")
];
