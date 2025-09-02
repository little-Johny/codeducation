"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Files extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Files.belongsTo(models.Lessons, {
        as: "lesson",
        foreignKey: "lessonId",
      });
    }
  }
  Files.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      filename: { type: DataTypes.STRING, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Files",
      tableName: "files",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Files;
};
