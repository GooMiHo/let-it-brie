const User = require('./user');
const Review = require('./review');
const Product = require('./product');
const Order = require('./order');
const ProductOrder = require('./productorder');

User.hasMany(Review);
Review.belongsTo(User);
Review.belongsTo(Product);
Product.hasMany(Review);

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Order, {through: ProductOrder});
Order.belongsToMany(Product, {through: ProductOrder});

module.exports = {
  User,
  Review,
  Product,
  Order,
  ProductOrder
}
