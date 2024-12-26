const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.profile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("qwwerrtyy", token);
  if (!token) {
    return res.status(403).json({ message: "Token is required." });
  }

  try {
    console.log("helllllll");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("hi", decoded);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      name: user.name,
      email: user.email,
      isEmailConfirmed: user.isEmailConfirmed,
    });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
