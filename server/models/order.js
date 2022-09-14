'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.belongsTo(models.Cart);
      models.Order.hasMany(models.OrderDetail, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Order.init({
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalOrder: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};