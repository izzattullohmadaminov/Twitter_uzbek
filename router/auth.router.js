const { Router } = require("express");
const router = Router();
const {
  getLogin,
  getRegister,
  postRegister,
  postLogin,
  logout,
} = require("../controller/auth.controller");
router.get("/login", getLogin);
router.get("/register", getRegister);
router.post("/register", postRegister);
router.post("/login", postLogin);
router.get("/logout", logout);
module.exports = router;
