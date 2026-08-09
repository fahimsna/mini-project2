let express = require("express");
let { registerUser, loginUser } = require("../controllers/userController");

let router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
