const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route

    // or userId?
    if (!req.session.id) {
      res.redirect('/login');
    } else {
      next();
    }f
  };
  
  module.exports = withAuth;