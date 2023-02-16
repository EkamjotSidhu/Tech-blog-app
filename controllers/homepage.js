const router = require('express').Router();
const { Posts, Comments, User } = require('../models')

router.get('/', async (req, res) => {
  try {
    const dbPosts = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = dbPosts.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/single-post/:id', async (req, res) => {
  try {
    // find all posts by post id and include comments with same post id
    const singlePostSrch = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          // where: {
          //   posts_id: req.params.id,
          // },
          include: [
            {
              model: User,
              attributes: ['username'],
            }
          ]
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = singlePostSrch.get({ plain: true });
    console.log('serialized data: ', post)
    // console.log('comments: ', post.comments)

    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      username: req.session.username
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// post route -> comment
router.post('/single-post', async (req, res) => {
  try {
    const comment = await Comments.create({
      comment: req.body.comment,
      user_id: req.body.user_id,
      posts_id: req.body.posts_id,
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;