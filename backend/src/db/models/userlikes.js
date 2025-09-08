"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserLikes.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });

      UserLikes.belongsTo(models.Lessons, {
        as: "lesson",
        foreignKey: "lessonId",
      });
    }
  }
  UserLikes.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      lessonId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "lesson_id",
        references: {
          model: "lessons",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "UserLikes",
      tableName: "user_likes",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          unique: true,
          fields: ["userId", "lessonId"],
        },
      ],
    }
  );
  return UserLikes;
};
