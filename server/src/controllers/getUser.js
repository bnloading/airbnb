const User = require("../models/User");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const getUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json(null);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(decodedToken.id);

    if (!userData) {
      return res.json(null);
    }

    const { name, email, _id: id, isAdmin } = userData;
    res.json({ name, email, id, isAdmin });
  } catch (error) {
    next(error);
  }
};

module.exports = getUser;
