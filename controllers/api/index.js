const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const restaurantRoutes = require('./restaurant-routes');
//const reviewRoutes = require('./review-routes');

router.use('/users', userRoutes);
router.use('/restaurants', restaurantRoutes);
//router.use('/reviews', reviewRoutes)

module.exports = router;