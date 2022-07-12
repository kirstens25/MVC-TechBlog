const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// GET ALL BLOG POSTS
router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.id,
            },
        });

    const blogs = blogData.map((blog) => blog.get({ plain: true}));

    res.render('dashboard', {
        blogs,
    });
    } catch (error) {
        res.redirect('login')
    }
});


// FIND & EDIT BLOG BY ID
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findOne(req.params.id);

        if (blogData) {
            const blog = blogData.get({ plain: true })

            res.render('edit-blog', {
                layout: 'dashboard',
                blog,
                loggedIn: true,
            });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.redirect('login')
    }
});

// CREATE NEW BLOG
router.get('/create', withAuth, (req, res) => {
    try {
        const blogData = await Blog.findAll(req.params.id);
    }
    res.render('create-blog', {
        layout: 'dashboard',
    });

    const blogs = blogData.map(blog => blog.get({ plain: true }));	
    res.render('create-blog', {	
      blogs,	
      loggedIn: true	
    });	
  } catch (err) {	
    res.status(500).json(err);	
  }	
});
});