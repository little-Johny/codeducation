"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserFavorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserFavorites.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });

      UserFavorites.belongsTo(models.Course, {
        as: "course",
        foreignKey: "courseId",
      });
    }
  }
  UserFavorites.init(
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
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "course_id",
        references: {
          model: "courses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "UserFavorites",
      tableName: "user_favorites",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          unique: true,
          fields: ["user_id", "course_id"],
        },
      ]
    }
  );
  return UserFavorites;
};
