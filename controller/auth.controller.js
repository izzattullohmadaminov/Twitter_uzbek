// impors
const bcrypt = require("bcryptjs");
const db = require("../model/index");
const User = db.user;
// Desc    Login page
// Method  GET /auth/login
// Access  Public
const getLogin = async (req, res) => {
  try {
    res.render("auth/login", {});
  } catch (err) {
    console.log(err);
  }
};
// Desc    Login page
// Method  POST /auth/login
// Access  Public
const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      return res.redirect("/auth/login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect("/auth/login");
    }
    res.redirect("/diary/my");
  } catch (err) {
    console.log(err);
  }
};

// Desc    Register page
// Method  GET /auth/register
// Access  Public
const getRegister = async (req, res) => {
  try {
    res.render("auth/register");
  } catch (err) {
    console.log(err);
  }
};
// Desc    Register page
// Method  POST /auth/register
// Access  Public
const postRegister = async (req, res) => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.redirect("/auth/register");
    }
    const userEmail = await User.findOne({
      where: {
        email,
      },
      raw: true,
    });
    if (userEmail) {
      return res.redirect("/auth/register");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      name,
      password: hashPassword,
    });

    res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getLogin,
  getRegister,
  postRegister,
  postLogin,
};
