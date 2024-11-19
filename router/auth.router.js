const { Router } = require("express");
const router = Router();
const {
  getLogin,
  getRegister,
  postRegister,
  postLogin,
  logout,
} = require("../controller/auth.controller");
const { body, check } = require("express-validator");
const { protected, unprotected } = require("../middlewares/auth");
router.get("/login", unprotected, getLogin);
router.get("/register", unprotected, getRegister);
router.post(
  "/login",
  [
    body("email", "Emailda xatolik bor").isEmail(),
    body("password", "Parolda xatolik bor").isLength({ min: 2 }),
  ],
  unprotected,
  postLogin
);
router.post(
  "/register",
  [
    check("email", "Emailda xatolik bor").isEmail(),
    check("name", "Ismda xatolik bor").isLength({ min: 2 }).isAlpha(),
    check("password", "Parolda xatolik bor")
      .isLength({ min: 6 })
      .isAlphanumeric(),
    check("confirmPassword", "Parolda xatolik bor")
      .isLength({ min: 6 })
      .isAlphanumeric(),
  ],
  unprotected,
  postRegister
);
router.get("/logout", protected, logout);
module.exports = router;
