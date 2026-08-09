let registerUser = async(req, res) => {
  let data = req.body;

  res.send({
    status: 1,
    message: "Data Inserted Successfully",
    data,
  });
};

module.exports = registerUser;
