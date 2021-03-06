const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../../config/keys");
const validateSignupInput = require("../validation/signup");
const validateLoginInput = require("../validation/login");

const signup = async data => {
  try {
    const { errors, isValid } = validateSignupInput(data);
    if (!isValid) {
      throw new Error(Object.values(errors));
    }

    const { firstName, lastName, age, email, password } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(
      {
        firstName,
        lastName,
        age,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();
    
    const token = jwt.sign({ _id: user._id }, keys.secretOrKey);
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {
    const { errors, isValid } = validateLoginInput(data);
    console.log(data);
    if (!isValid) {
      throw new Error(Object.values(errors));
    }

    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("$validation$wrong email/password combination");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("$validation$wrong email/password combination");

    const token = jwt.sign({ _id: user._id }, keys.secretOrKey);
    return { token, loggedIn: true, ...user._doc, password: null };

  } catch (err) {
    throw err;
  }
};

const verifyUser = async data => {
  try {
    const { token } = data;

    const decoded = jwt.verify(token, keys.secretOrKey);
    const { _id } = decoded;

    const [loggedIn, user] = await User.findById(_id).then(user => {
      return user ? [true, user] : [false, null];
    });

    return { loggedIn, ...user._doc, password: null };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { signup, login, verifyUser };