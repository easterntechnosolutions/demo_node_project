"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class File extends Model {
    static associate(models) {}
  }

  File.init(
    {
      userId: DataTypes.INTEGER,
      filename: DataTypes.STRING(50),
      filepath: DataTypes.STRING(110),
      mimetype: DataTypes.STRING(50),
      filesize: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "File",
    }
  );

  return File;
};
