const protected = (req, res, next) => {
  if (!req.session.isLogged) {
    res.redirect("/auth/login");
  }
  next();
};

const unprotected = (req, res, next) => {
  if (req.session.isLogged) {
    res.redirect("/diary/my");
  }
  next();
};
module.exports = {
  protected,
  unprotected,
};
