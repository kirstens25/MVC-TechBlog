const { User } =require ('../models');
const userData = 
[
  {
    name: "Jessy Taylors",
    email: "jessy.t@tech.com",
    password: "12pass34word56"
  },
  {
    name: "Stephanie Green",
    email: "steph.green@tech.com",
    password: "dogs@rebetterthancat5"
  },
  {
    name: "Jack Fern",
    email: "jack.fern1@tech.com",
    password: "Rac1ngc@r5"
  },
  {
    name: "Johny Tims",
    email: "john.tims@tech.com",
    password: "b0wl1234"
  },
  {
    name: "Emily Harris",
    email: "emily.h@tech.com",
    password: "S3pt3mb3r1987"
  },
]
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers
