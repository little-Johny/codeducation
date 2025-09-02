"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lessons.belongsTo(models.Course, {
        as: "course",
        foreignKey: "courseId",
      });

      Lessons.belongsToMany(models.User, {
        through: models.UserLikes,
        as: "likedByUsers",
        foreignKey: "lessonId",
        otherKey: "userId",
      });

      Lessons.hasMany(models.Files, {
        as: "files",
        foreignKey: "lessonId",
      });
    }
  }
  Lessons.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "course_id",
        references: {
          model: "courses",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      videoUrl: { type: DataTypes.STRING, allowNull: true, field: "video_url" },
    },
    {
      sequelize,
      modelName: "Lessons",
      tableName: "lessons",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Lessons;
};
