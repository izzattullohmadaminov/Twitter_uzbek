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
router.post("/delete/:id", deleteDiary);
router.get("/open/:id", getDiaryById);
router.get("/update/:id", updateDiaryPage);
router.post("/update/:id", updateDiary);
router.post("/comment/:id", addCommentToDiary);
router.get("/my", getMyDiary);
router.post("/add", addNewDiary);
router.get("/all", getAllDiary);

module.exports = router;
