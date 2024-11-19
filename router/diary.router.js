const { Router } = require("express");
const router = Router();
const {
  getMyDiary,
  deleteDiary,
  getDiaryById,
  updateDiaryPage,
  updateDiary,
  addNewDiary,
  addCommentToDiary,
  getAllDiary,
} = require("../controller/diary.controller");
const { protected } = require("../middlewares/auth");
router.post("/delete/:id", protected, deleteDiary);
router.get("/open/:id", protected, getDiaryById);
router.get("/update/:id", protected, updateDiaryPage);
router.post("/update/:id", protected, updateDiary);
router.post("/comment/:id", protected, addCommentToDiary);
router.get("/my", protected, getMyDiary);
router.post("/add", protected, addNewDiary);
router.get("/all", protected, getAllDiary);

module.exports = router;
