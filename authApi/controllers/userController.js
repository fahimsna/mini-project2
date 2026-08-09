let User = require("../models/User");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let registerUser = async (req, res) => {
  try {
    let data = req.body;
    let existingUser = await User.findOne({
      email: data.email,
    });
    if (existingUser) {
      return res.status(403).json({
        status: 0,
        message: "Email Already Exists",
      });
    }
    data.password = await bcrypt.hash(data.password, 10);
    let user = new User(data);
    let result = await user.save();

    res.status(201).json({
      status: 1,
      message: "Regisgtration Successful",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to register user",
      error,
    });
  }
};
let loginUser = async (req, res) => {
  try {
    let data = req.body;
    let user = await User.findOne({
      email: data.email,
    });
    if (!user) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }
    let passMatch = await bcrypt.compare(data.password, user.password);
    if (!passMatch) {
      return res.status(401).json({
        status: 0,
        message: "Invalid Password",
      });
    }
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      status: 1,
      message: "Successfully Logged in",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to login",
      error,
    });
  }
};
let getProfile = async (req, res) => {
  res.status(200).json({
    status: 1,
    message: "Profile Accessed Successfully",
    user: req.name,
  });
};

module.exports = { registerUser, loginUser,getProfile };
