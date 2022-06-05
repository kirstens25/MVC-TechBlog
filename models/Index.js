const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

// relationships between user, blog and comments

// User can have multiple blogs
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Blog belongs to user
Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Blog can have multiple comments
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

// Comment belongs to blog
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

// User can make multiple comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Comment belongs to user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Blog, Comment };