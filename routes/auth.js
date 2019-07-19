const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const User = require('../models/user');
const authController = require('../controllers/auth');

router.put('/signup', [
  body('email')
    .isEmail()
    .withMessage('Enter valid email')
    .custom((value, { req }) => {
      return User.findOne({ email: value })
        .then(userDoc => {
          if (userDoc) {
            return Promise.reject('Email already exists!');
          }
        })
    })
    .normalizeEmail(),
  body('password').trim().isLength({ min: 5 }),
  body('name').trim().not().isEmpty()
], authController.signUp);

module.exports = router;