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

    res.send({
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

module.exports = registerUser;
