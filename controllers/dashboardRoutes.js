const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Blog } = require('../models');
const withAuth = require('../utils/auth');

// get all blogs
router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                id: req.session.id,
            },
        });

    const blogs = blogData.map((blog) => blog.get({ plain: true}));

    res.render('all-blogs', {
        layout: 'dashboard',
        blogs,
    });
    } catch (error) {
        res.redirect('login')
    }
});
// get new blog form

// edit a blog (get blog by id)