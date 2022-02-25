const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Restaurant, Review } = require('../models');
const withAuth = require('../utils/auth');

//get reviews for dashboard
router.get('/', withAuth, (req, res) => {
    Review.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
          'id',
          'overall_rating',
          'atmosphere_rating',
          'food_rating',
          'service_rating',
          'review',
          'user_id',
          'restaurant_id',
          'created_at'
        ],
      include: [
        {
          model: Restaurant,
          attributes: ['id', 'name']
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbReviewData => {
        const reviews = dbReviewData.map(review => review.get({ plain: true }));

        res.render('dashboard', {
            reviews,
            loggedIn: req.session.loggedIn
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;