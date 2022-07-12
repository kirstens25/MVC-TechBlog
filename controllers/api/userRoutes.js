const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');	

// FIND USER INFO	
router.get('/', async (req, res) => {		
  try {		
    const userData = await User.findAll({		
      attributes: { exclude: ['password'] },		
      		
    });		
    res.status(200).json(userData);		
  } catch (err) {		
    res.status(500).json(err);		
  }		
});		
// FIND USER BY ID
router.get('/:id', async (req, res) => {		
  try {		
    const userData = await User.findOne({		
      attributes: { exclude: ['password'] },		
      where: {		
        id: req.params.id,		
      },		
      include: [		
        {		
          model: Blog,		
          attributes: ['id', 'title', 'content', 'created_at'],		
        },		
        {		
          model: Comment,		
          attributes: ['id', 'comment_text', 'created_at'],		
          include: {		
            model: Blog,		
            attributes: ['title'],		
          },		
        },		
      ],		
    });		
    if (!userData) {		
      res.status(400).json({ message: 'No user found with this id' });		
      return;		
    }		
    res.status(200).json(userData);		
  } catch (err) {		
    res.status(500).json(err);		
  }		
});		
// SIGNUP	NEW USER
router.post('/users/signup', async (req, res) => {
router.post('/', async (req, res) => {		
  try {
    const userData = await User.create({	
      // INPUT FIELDS AT SIGNUP STAGE
      username: req.body.username,	
      email: req.body.email,	
      password: req.body.password,		
    });	
    req.session.save(() => {	
      req.session.user_id = userData.id;	
      // USER INPUT SAVED
      req.session.username = userData.username;	
      req.session.loggedIn = true;	
      res.status(200).json(userData);	
    });	
  } catch (err) {	
    res.status(400).json(err);	
  }
});	
// LOGIN AS A USER
router.post('/login', async (req, res) => {	
  try {	
    const userData = await User.findOne({	
      where: {	
        email: req.body.email,	
      },	
    });	
    if (!userData) {	
      res	
        .status(400)	
        .json({ message: 'Incorrect email or password, please try again' });	
      return;	
    }	
    const validPassword = userData.checkPassword(req.body.password);	
    if (!validPassword) {
      res	
        .status(400)	
        .json({ message: 'Incorrect email or password, please try again' });	
      return;	
    }	
    req.session.save(() => {	
      req.session.user_id = userData.id;	
      // USER INPUT SAVED	
      req.session.username = userData.username;	
      req.session.loggedIn = true;	
      res.status(200).json({ userData, message: 'Woohoo - You are logged in!' });	
    });	
  } catch (err) {	
    res.status(400).json(err);	
  }	
});	
// UPDATE USER
router.put('/:id', withAuth, async (req, res) => {	
  try {	
    const userData = User.update(req.body, {	 
      individualHooks: true,	
      where: {	
        id: req.params.id,	
      },	
    });	
    if (!userData[0]) {	
      res.status(404).json({ message: 'Sorry, no user found with this id. Try again.'});	
      return;	
    }	
    res.json(userData);	
  } catch (err) {	
    res.status(500).json(err);	
  }	
});	
// DELETE	A USER
router.delete('/:id', withAuth, async (req, res) => {	
  try {	
    const userData = User.destroy(req.body, {	
      where: {	
        id: req.params.id,	
      },	
    });	
    if (!userData) {	
      res.status(404).json({ message: 'Sorry - no user found with this id. Try again.' });	
      return;	
    }	
    res.json(userData);	
  } catch (err) {	
    res.status(500).json(err);	
  }	
});	
// LOGOUT	
router.post('/logout', (req, res) => {	
  if (req.session.loggedIn) {	
    req.session.destroy(() => {	
      res.status(204).end();	
    });	
  } else {	
    res.status(404).end();	
  }	
});	
module.exports = router;