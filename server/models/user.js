'use strict';

const { hashPassword } = require("../utils/hashPassword");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Cart, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', hashPassword(value));
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });
  return User;
};