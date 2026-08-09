let User = require("../models/User");
let registerUser = async (req, res) => {
  let data = req.body;
  let user=new User(data);
  let result=await user.save();

  res.send({
    status: 1,
    message: "Data Inserted Successfully",
    result,
  });
};

module.exports = registerUser;
