// impors
const express = require("express");
const dotenv = require("dotenv");
const { create } = require("express-handlebars");
const path = require("path");
const pool = require("./config/db");
const db = require("./model");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const flash = require("connect-flash");
// Initialize express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    store: new PgSession({
      pool: pool,
      tableName: "users_sessions",
    }),
    secret: "your secret key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
// Initial env  variables
dotenv.config();
// Initialize template engine (handlebars)
const hbs = create({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views", "layouts"), // Asosiy layoutlar katalogi
  partialsDir: path.join(__dirname, "views", "partials"), // Qismlar katalogi
});
app.engine(".hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

// Diary router
app.use("/diary", require("./router/diary.router"));
// Auth router
app.use("/auth", require("./router/auth.router"));
// User router
app.use("/user", require("./router/user.router"));

// Static files
const port = process.env.PORT || 3001;
const start = async () => {
  try {
    await db.sequelize.sync();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
