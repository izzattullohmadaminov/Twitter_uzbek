const { Router } = require("express");
const router = Router();
const {
  getLogin,
  getRegister,
  postRegister,
  postLogin,
  logout,
} = require("../controller/auth.controller");
const { protected, unprotected } = require("../middlewares/auth");
router.get("/login", unprotected, getLogin);
router.get("/register", unprotected, getRegister);
router.post("/register", unprotected, postRegister);
router.post("/login", unprotected, postLogin);
router.get("/logout", protected, logout);
module.exports = router;
