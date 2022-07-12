const withAuth = (req, res, next) => {
// IF USER NOT LOGGED IN, DIRECT TO LOGIN
    if (!req.session.id) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;