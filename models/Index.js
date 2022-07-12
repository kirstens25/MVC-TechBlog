const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

// CREATES RELATIONSHIP BETWEEN USER, BLOG AND COMMENTS
// USER CAN HAVE MULTIPLE BLOGS
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// BLOG BELONGS TO USER
Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// BLOG CAN HAVE MULTIPLE COMMENTS
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

// COMMENT BELONGS TO BLOG
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

// USER CAN MAKE MULTIPLE COMMENTS
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// COMMENT BELONGS TO A USER
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Blog, Comment };