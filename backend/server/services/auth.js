const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../../config/keys");
const validateSignupInput = require("../validation/signup");
const validateLoginInput = require("../validation/login");

const signup = async data => {
  try {
    const { message, isValid } = validateSignupInput(data);
    if (!isValid) {
      throw new Error(message);
    }

    const { name, email, password } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(
      {
        name,
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
    const { message, isValid } = validateLoginInput(data);
    if (!isValid) {
      throw new Error(message);
    }

    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("wrong username/password combination");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("wrong username/password combination");

    const token = jwt.sign({ _id: user._id }, keys.secretOrKey);
    return { token, loggedIn: true, ...user._doc, password: null };

  } catch (err) {
    throw err;
  }
};

const logout = async id => {
  const user = await User.findById(id);
  const token = "";
  
	return { token, loggedIn: false, ...user._doc, password: null };
};

const verifyUser = async data => {
  try {
    const { token } = data;

    const decoded = jwt.verify(token, keys.secretOrKey);
    const { _id } = decoded;

    const loggedIn = await User.findById(_id).then(user => {
      return user ? true : false;
    });

    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { signup, logout, login, verifyUser };