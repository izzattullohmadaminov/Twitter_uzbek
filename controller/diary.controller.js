const db = require("../model/index");
const Diary = db.diary;
const Comment = db.comment;
// Desc    Diary page
// Method  GET /diary/my
// Access  Private
const getMyDiary = async (req, res) => {
  try {
    const diaries = await Diary.findAll({
      raw: true,
      plain: false,
      nest: true,
    });
    const formattedDiaries = diaries.map((diary) => ({
      ...diary,
      text:
        diary.text.length > 50 ? diary.text.slice(0, 100) + "..." : diary.text,
    }));
    res.render("diary/my-diary", {
      title: "My Diary",
      diaries: formattedDiaries.reverse(),
      isAuthenticated: req.session.isLogged,
    });
  } catch (err) {
    console.log(err);
  }
};

// Desc    Diary page
// Method  POST /diary/my
// Access  Private
const addNewDiary = async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    if (text.length > 0) {
      await Diary.create({
        text,
        imageUrl,
      });
      res.redirect("/diary/my");
    } else {
      res.redirect("/diary/my");
    }
  } catch (err) {
    console.log(err);
  }
};

// Desc    Diary page delete by Id
// Method  POST /diary/my/:id
// Access  Private
const deleteDiary = async (req, res) => {
  try {
    await Diary.destroy({
      where: { id: req.params.id },
    });
    res.redirect("/diary/my");
  } catch (err) {
    console.log(err);
  }
};

// Desc    Diary page Open by Id
// Method  POST /diary/my/:id
// Access  Private
const getDiaryById = async (req, res) => {
  try {
    const data = await Diary.findByPk(req.params.id, {
      raw: false,
      plain: true,
      include: ["comments"],
      nest: true,
    });
    const diary = await data.toJSON();
    res.render("diary/one-diary", {
      title: "Diary",
      diary: diary,
      comments: diary.comments,
    });
  } catch (err) {
    console.log(err);
  }
};
// Desc    Diary page Open by Id
// Method  Get /diary/update/:id
// Access  Private
const updateDiaryPage = async (req, res) => {
  try {
    const diary = await Diary.findByPk(req.params.id, {
      raw: true,
    });
    res.render("diary/update-diary", {
      title: "Update Diary",
      diary,
    });
  } catch (err) {
    console.log(err);
  }
};
// Desc    Diary page Open by Id
// Method  POST /diary/update/:id
// Access  Private
const updateDiary = async (req, res) => {
  try {
    await Diary.update(
      { text: req.body.text },
      {
        where: { id: req.params.id },
      }
    );
    res.redirect("/diary/my");
  } catch (error) {
    console.log(error);
  }
};
// Desc    Add Comment
// Method  POST /diary/comment/:id
// Access  Private
const addCommentToDiary = async (req, res) => {
  try {
    await Comment.create({
      name: "admin",
      comment: req.body.comment,
      diaryId: req.params.id,
    });
    await res.redirect(`/diary/open/${req.params.id}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getMyDiary,
  addNewDiary,
  deleteDiary,
  getDiaryById,
  updateDiaryPage,
  updateDiary,
  addCommentToDiary,
};
