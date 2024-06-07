const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const getUserDetailsFromToken = async (token) => {
  try {
    if (!token) {
      return {
        message: "session out",
        logout: true,
      };
    }
    
    const decode = jwt.verify(token, process.env.JWT_SECREAT_KEY);
    const user = await UserModel.findById(decode.id).select('-password');
    return user;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return {
        message: "Token expired",
        expired: true,
      };
    }
    throw error;
  }
};

module.exports = getUserDetailsFromToken;
