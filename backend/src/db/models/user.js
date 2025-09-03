"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Un maestro puede crear muchos cursos
      User.hasMany(models.Course, {
        as: "courses",
        foreignKey: "userId",
      });

      // Un usuario puede tener muchos favoritos
      User.belongsToMany(models.Course, {
        through: "UserFavorites",
        as: "favorites",
        foreignKey: "userId",
      });

      // Un usuario puede tener muchos favoritos
      User.belongsToMany(models.Lessons, {
        through: models.UserLikes,
        as: "likedLessons",
        foreignKey: "userId",
        otherKey: "lessonId",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM("student", "teacher", "admin"),
        defaultValue: "student",
        allowNull: false,
      },
      theme: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // Por defecto sera false(black)
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
