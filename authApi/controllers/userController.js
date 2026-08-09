let User = require("../models/User");
let bcrypt = require("bcrypt");
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
      message: "Data Inserted Successfully",
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
    res.status(200).json({
      status: 1,
      message: "Successfully Loged in",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to login",
      error,
    });
  }
};

module.exports = { registerUser, loginUser };
