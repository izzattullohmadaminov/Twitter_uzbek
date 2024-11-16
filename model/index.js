const Sequelize = require("sequelize");

const sequelize = new Sequelize("holid27", "postgres", "0507", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.diary = require("./diary.model")(sequelize, Sequelize);
db.comment = require("./comment.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);

db.user.hasMany(db.diary, {
  as: "diaries",
  onDelete: "CASCADE",
  constraints: true,
});
db.user.hasMany(db.comment, {
  as: "comments",
  onDelete: "CASCADE",
  constraints: true,
});
//
db.diary.hasMany(db.comment, {
  foreignKey: "diaryId",
  onDelete: "CASCADE",
  as: "comments",
});
db.diary.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});
db.comment.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});
db.comment.belongsTo(db.diary, {
  foreignKey: "diaryId",
  as: "diaries",
});

db.sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error syncing database", err));

module.exports = db;
