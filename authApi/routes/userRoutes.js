let express = require("express");
let registerUser = require("../controllers/userController");

let router = express.Router();
router.post("/api/users/register", registerUser);

module.exports = router;
