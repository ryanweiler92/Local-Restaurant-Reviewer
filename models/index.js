const User = require('./User');
const Restaurant = require('./Restaurant');
const Review = require('./Review')

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Restaurant.hasMany(Review, {
    foreignKey: 'restaurant_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

Review.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id'
});

module.exports = { User, Restaurant, Review}

