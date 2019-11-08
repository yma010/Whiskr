const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateSignupInput(data) {
  let errors = {};

  data.firstName = validText(data.firstName) ? data.firstName : '';
  data.lastName = validText(data.lastName) ? data.lastName : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.age = validText(data.zipCode) ? data.zipCode : '';

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'Required';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Required';
  }

  if (!Validator.isLength(data.password, { min: 12, max: 32 })) {
    errors.password = 'Password must be at least 12 characters';
  }

  if (Validator.isEmpty(data.age)) {
    errors.zipCode = 'Required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};