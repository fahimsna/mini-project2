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
    let token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
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
  try {
    let user = await User.findById(req.name.id);

    if (!user) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: 1,
      message: "Profile Accessed Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to get profile",
      error,
    });
  }
};
let adminDashboard = async (req, res) => {
  res.status(200).json({
    status: 1,
    message: "Welcome to Admin Dashboard",
    user: req.name,
  });
};
let updateProfile = async (req, res) => {
  try {
    let data = req.body;

    let user = await User.findById(req.name.id);

    if (!user) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    user.name = data.name || user.name;
    user.email = data.email || user.email;

    let result = await user.save();

    res.status(200).json({
      status: 1,
      message: "Profile Updated Successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to update profile",
      error,
    });
  }
};
let changePassword = async (req, res) => {
  try {
    let data = req.body;

    let user = await User.findById(req.name.id);

    if (!user) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    let passMatch = await bcrypt.compare(data.currentPassword, user.password);

    if (!passMatch) {
      return res.status(401).json({
        status: 0,
        message: "Current password is incorrect",
      });
    }

    user.password = await bcrypt.hash(data.newPassword, 10);

    await user.save();

    res.status(200).json({
      status: 1,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to change password",
      error,
    });
  }
};
let deleteProfile = async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.name.id);

    if (!user) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: 1,
      message: "Account Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to delete account",
      error,
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  adminDashboard,
  updateProfile,
  changePassword,
  deleteProfile,
};
