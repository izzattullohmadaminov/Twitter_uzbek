const db = require("../model/index");
const Diary = db.diary;
const Comment = db.comment;
const User = db.user;
// Desc    Diary page
// Method  GET /diary/my
// Access  Private
const getMyDiary = async (req, res) => {
  try {
    const diaries = await Diary.findAll({
      where: { userId: req.session.user.id },
      raw: true,
      plain: false,
      include: ["users"],
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
        userId: req.session.user.id,
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
      include: ["comments", "users"],
      nest: true,
    });
    const diary = await data.toJSON();
    res.render("diary/one-diary", {
      title: "Diary",
      diary: diary,
      comments: diary.comments,
      isAuthenticated: req.session.isLogged,
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
  const user = User.findByPk(req.session.user.id);
  if (req.body.comment.length === 0 || req.body.comment.trim().length === 0) {
    return res.redirect(`/diary/open/${req.params.id}`);
  }
  try {
    await Comment.create({
      name: req.session.user.name,
      comment: req.body.comment,
      diaryId: req.params.id,
      userId: user.id,
    });
    await res.redirect(`/diary/open/${req.params.id}`);
  } catch (err) {
    console.error(err);
  }
};
//Desc      All Diaries
//Route     POST /diary/all
//Access    Public
const getAllDiary = async (req, res) => {
  try {
    const diaries = await Diary.findAll({
      raw: true,
      plain: false,
      include: ["users"],
      nest: true,
    });
    if (!diaries) {
      return res.redirect("/diary/my");
    }
    res.render("diary/all-diary", {
      title: "All Diaries",
      diaries: diaries.reverse(),
      isAuthenticated: req.session.isLogged,
    });
  } catch (err) {
    console.log(err);
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
  getAllDiary,
};
