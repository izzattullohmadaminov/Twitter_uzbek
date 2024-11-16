module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    "comment",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      diaryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: true,
    }
  );
  return Comment;
};
