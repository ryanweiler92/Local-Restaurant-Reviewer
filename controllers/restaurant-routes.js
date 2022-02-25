const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Restaurant, Review } = require('../models');

//get all restaurants
router.get('/', (req, res) => {
    Restaurant.findAll({
      include: [
        {
          model: Review,
          attributes: ['id']
        }
      ]
    })
      .then(dbRestaurantData => {
        const restaurants = dbRestaurantData.map(restaurant => restaurant.get({ plain: true }));

        res.render('restaurants', {
            restaurants,
            loggedIn: req.session.loggedIn
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;