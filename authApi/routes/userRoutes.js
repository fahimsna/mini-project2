let express = require("express");
let {
  registerUser,
  loginUser,
  getProfile,
  adminDashboard,
  updateProfile,
  changePassword,
  deleteProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
let adminMiddleware = require("../middleware/adminMiddleware");

let router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.get("/admin", authMiddleware, adminMiddleware, adminDashboard);
router.put("/profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/profile", authMiddleware, deleteProfile);

module.exports = router;
