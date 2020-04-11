const express = require("express");
const {
  defUser,
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateprofilepic,
} = require("../controllers/userController");

const router = express.Router();

const { protect } = require("../middlewares/auth");

router.get("/", defUser);
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.put("/updateprofilepic", protect, updateprofilepic);

module.exports = router;
