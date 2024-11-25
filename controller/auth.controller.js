// impors
const bcrypt = require("bcryptjs");
const db = require("../model/index");
const User = db.user;
const { validationResult } = require("express-validator");
// Desc    Login page
// Method  GET /auth/login
// Access  Public
const getLogin = async (req, res) => {
  try {
    const isAuthenticated = req.session.isLogged;
    res.render("auth/login", {
      title: "Login",
      isAuthenticated,
      error: req.flash("error"),
      success: req.flash("success"),
    });
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
    const isAuthenticated = req.session.isLogged;
    const error = validationResult(req);
    if (email.trim().length === 0 || password.trim().length === 0) {
      return res.status(400).render("auth/login", {
        error: "Please enter email and password",
        title: "Login",
        isAuthenticated,
      });
    } else {
      if (!error.isEmpty()) {
        return res.status(400).render("auth/login", {
          error: error.array()[0].msg,
          title: "Login",
          isAuthenticated,
        });
      }
      const user = await User.findOne({ where: { email }, raw: true });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          req.session.isLogged = true;
          req.session.user = user;
          req.flash("success", "Login successful");
          req.session.save((err) => {
            if (err) throw err;
            return res.redirect("/diary/my");
          });
        } else {
          req.flash("error", "Incorrect password");
          return res.redirect("/auth/login");
        }
      } else {
        req.flash("error", "User not found");
        return res.redirect("/auth/login");
      }
    }
  } catch (err) {
    req.flash("error", "Something went wrong");
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
    const error = validationResult(req);
    const isAuthenticated = req.session.isLogged;
    if (!error.isEmpty()) {
      return res.status(400).render("auth/register", {
        error: error.array()[0].msg,
        title: "Register",
        isAuthenticated,
        oldInput: { email, name, password, confirmPassword },
      });
    }
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
//Desc      Logout user
//Route     POST /auth/logout
//Access    Private
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};

module.exports = {
  getLogin,
  getRegister,
  postRegister,
  postLogin,
  logout,
};
