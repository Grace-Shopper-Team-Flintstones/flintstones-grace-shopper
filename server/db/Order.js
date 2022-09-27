const Sequelize = require('sequelize');
const db = require('./database');

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  ordId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  accountId: {
    type: Sequelize.INTEGER,
  },
  productId: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  dateOrdered: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  itemPrice: {
    type: Sequelize.DECIMAL,
    allowNull:false,
  },
});

module.exports = Order;
