let express = require("express");
let {
  registerUser,
  loginUser,
  getProfile,
  adminDashboard,
  updateProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
let adminMiddleware = require("../middleware/adminMiddleware");

let router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.get("/admin", authMiddleware, adminMiddleware, adminDashboard);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
