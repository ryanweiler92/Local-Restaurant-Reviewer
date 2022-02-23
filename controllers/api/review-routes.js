const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Restaurant, Review} = require('../../models');
const withAuth = require('../../utils/auth');

//get all reviews
router.get('/', (req, res) => {
    Review.findAll()
      .then(dbReviewData => res.json(dbReviewData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//get review by id
router.get('/:id', (req, res) => {
    Review.findOne({
      where: {
        id: req.params.id
      },
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
        if (!dbReviewData) {
          res.status(404).json({ message: 'No review found with this id' });
          return;
        }
        res.json(dbReviewData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //post a review
  router.post('/', withAuth, (req, res) => {
    // expects => {comment_text: "Great game", user_id: 1, post_id: 2}
    Review.create({
      overall_rating: req.body.overall_rating,
      atmosphere_rating: req.body.atmosphere_rating,
      food_rating: req.body.food_rating,
      service_rating: req.body.service_rating,
      review: req.body.review,
      // user_id: req.body.user_id,
      user_id: req.session.user_id,
      restaurant_id: req.body.restaurant_id
    })
      .then(dbReviewData => res.json(dbReviewData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });

//get review by id
router.get('/:id', (req, res) => {
    Review.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Restaurant,
          attributes: ['name']
        },
        {
          model: User,
          attributes: ['username'],
        }
      ]
    })
      .then(dbReviewData => {
        if (!dbReviewData) {
          res.status(404).json({ message: 'No review found with this id' });
          return;
        }
        res.json(dbReviewData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //update a review
  router.put('/:id', (req, res) => {
    // expects {username: 'Lindelof2', password: 'manchester'}
    Review.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbReviewData => {
        if (!dbReviewData) {
          res.status(404).json({ message: 'No review found with this id' });
          return;
        }
        res.json(dbReviewData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

    //delete a review
    router.delete('/:id', withAuth, (req, res) => {
        Review.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(dbReviewData => {
            if (!dbReviewData) {
              res.status(404).json({ message: 'No review found with this id!' });
              return;
            }
            res.json(dbReviewData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });

  module.exports = router;