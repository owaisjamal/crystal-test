const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accountModel = require('../models/accountModel');

const validateCreateAccountInput = ({ first_name, last_name, email, phone, password, birthday }) => {
  if (!first_name || !last_name || !email || !phone || !password || !birthday) {
    throw { status: 400, message: 'All fields are required' };
  }
};

const validateUserLoginInput = ({ email, password }) => {
  if (!email || !password) {
    throw { status: 400, message: 'Email and password are required' };
  }
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

const authenticateUser = async (email, password) => {
  const user = await accountModel.getAccountByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw { status: 401, message: 'Invalid email or password' };
  }

  return jwt.sign({ user_id: user.id }, 'your-secret-key', { expiresIn: '1h' });
};

module.exports = {
  validateCreateAccountInput,
  validateUserLoginInput,
  hashPassword,
  authenticateUser,
};
