const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();

    if (user) {
      const correctPass = await bcrypt.compare(password, user.password);

      if (correctPass) {
        const isAdmin = user.email === "admin@gmail.com";
        jwt.sign(
          { email: user.email, id: user._id, isAdmin },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite:
                  process.env.NODE_ENV === "production" ? "None" : "Lax",
              })
              .json({
                name: user.name,
                email: user.email,
                id: user._id,
                isAdmin,
              });
          },
        );
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
