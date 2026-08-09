let User = require("../models/User");
let bcrypt = require("bcrypt");
let registerUser = async (req, res) => {
  let data = req.body;
  data.password = await bcrypt.hash(data.password, 10);
  let user = new User(data);
  let result = await user.save();

  res.send({
    status: 1,
    message: "Data Inserted Successfully",
    result,
  });
};

module.exports = registerUser;
