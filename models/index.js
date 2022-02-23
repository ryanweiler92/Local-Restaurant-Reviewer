const User = require('./User');
const Restaurant = require('./Restaurant');
const Review = require('./Review')

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Restaurant.hasMany(Review, {
    foriegnKey: 'restaurant_id'
});

Review.belongsTo(User, {
    foriegnKey: 'user_id'
});

Review.belongsTo(Restaurant, {
    foriegnKey: 'resaurant_id'
});

module.exports = { User, Restaurant, Review}

