const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Restaurant, Review } = require('../models');
const withAuth = require('../utils/auth');

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

  //see reviews for restaurant
  router.get('/reviews/:id', withAuth, (req, res) => {
      Restaurant.findByPk(req.params.id, {
          include: [
              {
              model: Review,
              attributes: ['id', 'overall_rating', 'atmosphere_rating', 'food_rating',
            'service_rating', 'review', 'user_id', 'restaurant_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
            }
          ]
      })
      .then(dbRestaurantData => {
          if (dbRestaurantData) {
              const restaurant = dbRestaurantData.get({ plain: true });

              res.render('single-restaurant', {
                  restaurant,
                  loggedIn: true
              });
          } else {
              res.status(404).end();
          }
      })
      .catch(err => {
          res.status(500).json(err);
      })
  })

  //post review for restaurant
  router.get('/post/:id', withAuth, (req, res) => {
    Restaurant.findByPk(req.params.id, {
        include: [
            {
            model: Review,
            attributes: ['id', 'overall_rating', 'atmosphere_rating', 'food_rating',
          'service_rating', 'review', 'user_id', 'restaurant_id', 'created_at'],
          include: {
              model: User,
              attributes: ['username']
          }
          }
        ]
    })
    .then(dbRestaurantData => {
        if (dbRestaurantData) {
            const restaurant = dbRestaurantData.get({ plain: true });

            res.render('single-restaurant', {
                restaurant,
                loggedIn: true
            });
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;