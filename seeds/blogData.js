const { Blog } =require ('../models');
const blogData = 
[
  {
    title: "Top 5 Smartphones 2022",
    content: "Did you know there are more than just iPhones available in the Smartphone category, in 2022? Until we did some research, we didn't know there was either! Mind boggling stuff. Here are our top 5 smartphone picks, that don't include Apple's iPhone (because obviously you'd just buy that if that was an option).",
    user_id: 3
  },
  {
    title: "Knock, Knock - but no need to ask 'Who's there?'... Welcome to 2022.",
    content: "Ah, video doorbells. What a time to be alive! Now you don't even need to go to the front door to see who's knocking. Better yet, you don't even need to be at home to know! Thanks to the trusty tech readily available to us now, simply log into a mobile app to see what's happening LIVE at your front door! Don't believe me? Here's the list of all makes and models for video doorbells.",
    user_id: 5
  },
  {
    title: "Mobile Phones for Kids... Are they really necessary?",
    content: "In today's society, EVERYONE has a mobile phone. Well, except if they fall into the 'aged under 12' category, then it's probably not EVERYONE. When is the right age for a child to get their own phone? Is it even necessary? What dangers can it lead to? What benefits can it have? We sit down with the Safety Commissioner and a Child Psychologist to have your questions answered.",
    user_id: 2
  },
]
 const seedBlogs = () => Blog.bulkCreate(blogData);

 module.exports = seedBlogs