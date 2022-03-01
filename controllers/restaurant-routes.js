const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Restaurant, Review } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize')

//get all restaurants
router.get('/', (req, res) => {
    const revCount = [sequelize.literal(`(
        SELECT COUNT(*)
        FROM review
        WHERE review.restaurant_id = restaurant.id
    )`),
    'reviewCount']

    const overallRatings = [sequelize.literal(`(
        SELECT AVG(overall_rating) 'Average Overall Rating'
        FROM review  
        WHERE review.restaurant_id = restaurant.id
        GROUP BY review.restaurant_id
    )`),
    'avgOverallRatings']

    Restaurant.findAll({
        attributes: [
            'id',
            'name',
            'cuisine',
            'price_range',
            'address',
            'created_at',
            revCount,
            overallRatings
          ],
      include: [
        {
          model: Review,
          attributes: ['id']
        }
      ],
      order: [
        ['created_at', 'DESC']
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
        attributes: [
            'id',
            'name',
        ],
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

            res.render('post-review', {
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