'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    isbn: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING,
    publishedYear: DataTypes.INTEGER,
    publisher: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};