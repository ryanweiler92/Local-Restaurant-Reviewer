const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Restaurant, Review} = require('../../models');
const withAuth = require('../../utils/auth');

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
                attributes: ['id', 'overall_rating', 'atmosphere_rating', 'food_rating',
              'service_rating', 'review', 'user_id', 'restaurant_id', 'created_at'],
        }
            ]
        })
      .then(dbRestaurantData => res.json(dbRestaurantData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  //get restaurant by ID
  router.get('/:id', (req, res) => {
    Restaurant.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'name',
        'cuisine',
        'price_range',
        'address',
        'created_at'
      ],
      include: [
        {
            model: Review,
            attributes: ['id', 'overall_rating', 'atmosphere_rating', 'food_rating',
            "service_rating", "review", "user_id", "restaurant_id", 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
      ]
    })
      .then(dbRestaurantData => {
        if (!dbRestaurantData) {
          res.status(404).json({ message: 'No restaurant found with this id' });
          return;
        }
        res.json(dbRestaurantData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //post a restaurant
  router.post('/', withAuth, (req, res) => {
    Restaurant.create({
      name: req.body.name,
      cuisine: req.body.cuisine,
      price_range: req.body.price_range,
      address: req.body.address
    })
      .then(dbRestaurantData => res.json(dbRestaurantData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //update a restaurant
  router.put('/:id', withAuth, (req, res) => {
    Restaurant.update(
      {
        name: req.body.name,
        cuisine: req.body.cuisine,
        price_range: req.body.price_range,
        address: req.body.address
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbRestaurantData => {
        if (!dbRestaurantData) {
          res.status(404).json({ message: 'No restaurant found with this id' });
          return;
        }
        res.json(dbRestaurantData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //delete a post
  router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Restaurant.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbRestaurantData => {
        if (!dbRestaurantData) {
          res.status(404).json({ message: 'No restaurant found with this id' });
          return;
        }
        res.json(dbRestaurantData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;