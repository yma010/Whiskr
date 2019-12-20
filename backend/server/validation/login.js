const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = "$email$Invalid email$";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};