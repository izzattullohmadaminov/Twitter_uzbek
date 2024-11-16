const {
  getMyProfile,
  updateMyProfile,
} = require("../controller/user.controller");

const { Router } = require("express");
const router = Router();
router.get("/myprofile", getMyProfile);
router.post("/update", updateMyProfile);

module.exports = router;
