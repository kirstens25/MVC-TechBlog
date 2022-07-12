const { Comment } =require ('../models');
const commentData = [
    {
        user_id: 1,
        blog_id: 5,
        comment_text: "Interesting.. I thought otherwise"
    },
    {
        user_id: 4,
        blog_id: 4,
        comment_text: "Wow I didn't know that"
    },
    {
        user_id: 1,
        blog_id: 4,
        comment_text: "Very useful - thanks"
    },
    {
        user_id: 3,
        blog_id: 5,
        comment_text: "Great article!"   
    },
    {
        user_id: 3,
        blog_id: 2,
        comment_text: "That's very true!"
    },
    {
        user_id: 5,
        blog_id: 4,
        comment_text: "So amazing!"
    },
    {
        user_id: 3,
        blog_id: 3,
        comment_text: "This is a great article. Thanks for sharing."
    },
    {
        user_id: 2,
        blog_id: 1,
        comment_text: "Oh! There you go, you learn something new everyday."
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments