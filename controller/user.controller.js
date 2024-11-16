const db = require("../model/index");
const User = db.user;
const Diary = db.diary;
const bcrypt = require("bcryptjs");
// Desc    My Profile
// Method  GET /myprofile
// Access  Private
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id);
    const diaryCount = await Diary.count({ where: { userId: user.id } });
    res.render("user/my-profile", {
      title: "My Profile",
      user: user.dataValues,
      diaryCount,
      isAuthenticated: req.session.isLogged,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({
      where: { id: req.session.user.id },
      raw: true,
    });
    if (user.email === email) {
      return res.redirect("/user/myprofile");
    }
    const newPassword = await bcrypt.hash(password, 10);
    const newDetails = await User.update(
      { name, email, password: newPassword },
      {
        where: { id: req.session.user.id },
        returning: true,
        raw: true,
        plain: true,
      }
    );
    req.session.user = newDetails[1];
    res.redirect("/user/myprofile");
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getMyProfile,
  updateMyProfile,
};
