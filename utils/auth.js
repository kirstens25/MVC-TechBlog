const withAuth = (req, res, next) => {
// IF USER NOT LOGGED IN, DIRECT TO LOGIN
    console.log('hit auth')
    if (!req.session.userId) {
      console.log('hti no id')
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;