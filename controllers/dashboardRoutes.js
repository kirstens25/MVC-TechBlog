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
        console.log('Hi')
        console.log(error)
        res.redirect('login')
    }
});
// get new blog form
router.get('/new', withAuth, (req, res) => {
    res.render('create-blog', {
        layout: 'dashboard',
    });
});
// edit a blog (get blog by id)
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);

        if (blogData) {
            const blog = blogData.get({ plain: true })

            res.render('edit-blog', {
                layout: 'dashboard',
                blog,
            });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.redirect('login')
    }
})