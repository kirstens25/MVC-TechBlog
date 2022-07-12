const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');


// FIND ALL BLOGS AND JOIN WITH USER/COMMENT DATA
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {model: Comment,
          attributes: [
            'id',
            'comment_text',
            'blog_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // SERIALIZE DATA SO TEMPLATE CAN READ IT
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // SERIALIZED DATA AND SESSION INFO INTO TEMPLATE
    res.render('homepage', {
      blogs,
      logged_in: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// FIND BLOG BY ID
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'created_at', 'content', 'user_id'],

      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'blog_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    if (!blogData) {
      res.status(404).json({ message: 'Sorry, no blog found with this id. Try again!' });
      return;
    }

   // SERIALIZE DATA
   const blog = blogData.get({ plain: true });

   // PASS DATA TO THE TEMPLATE
   res.render('single-comment', {
     blog,
     loggedIn: req.session.loggedIn,
   });
 } catch (err) {
   res.status(500).json(err);
 }
});


// USE WITHAUTH MIDDLEWARE TO PREVENT ACCESS TO THE ROUTE
router.get('/blog', withAuth, async (req, res) => {
  try {
    // FIND LOGGED IN USER BASED ON SESSION ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    },
    );

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.get('/login', (req, res) => {
  // IF ALREADY LOGGED IN, REDIRECT USER TO POSTS
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});


// SIGNUP (IF NOT ALREADY A USER)
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
