const {
  getMyProfile,
  updateMyProfile,
} = require("../controller/user.controller");

const { Router } = require("express");
const { protected } = require("../middlewares/auth");
const router = Router();
router.get("/myprofile", protected, getMyProfile);
router.post("/update", protected, updateMyProfile);

module.exports = router;
