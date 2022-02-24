const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Restaurant, Review } = require('../models');

//get reviews for homepage
router.get('/', (req, res) => {
    Review.findAll({
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

        res.render('homepage', {
            reviews,
            loggedIn: req.session.loggedIn
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  module.exports = router;