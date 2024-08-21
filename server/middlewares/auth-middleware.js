require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized, token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  try {
    const isVerified = jwt.verify(jwtToken, JWT_SECRET_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });

    req.user = userData;
    req.token = token;
    req.userID = userData._id;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized, invalid token" });
  }
}

module.exports = authMiddleware;
