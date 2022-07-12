// SEED DATA FROM BLOG, USER, COMMENTS
const sequelize = require('../config/connection');
const seedBlogs = require('./blog-seed');
const seedUsers = require('./user-seed');
const seedComments = require('./comment-seed')

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('The DB is synced');

  await seedUsers();
  console.log('The users are seeded');

  await seedBlogs();
  console.log('The blogs are seeded');

  await seedComments();
  console.log('The comments are seeded');

  process.exit(0);
};

seedAll();
