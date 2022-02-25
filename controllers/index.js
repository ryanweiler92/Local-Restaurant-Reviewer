const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js')
const dashboardRoutes = require('./dashboard-routes.js')
const restaurantsRoutes = require('./restaurant-routes.js')

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/restaurants', restaurantsRoutes)

module.exports = router;