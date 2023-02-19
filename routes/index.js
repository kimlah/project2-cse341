const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'https://project2-cse341.onrender.com',
    clientID: 'Wwikwnxmljzu9g2OtPpFZFmS9md3b8oH',
    issuerBaseURL: 'https://dev-1bdp5rwnxqi64mwc.us.auth0.com'
  };
  
  // auth router attaches /login, /logout, and /callback routes to the baseURL
  app.use(auth(config));
  
  // req.isAuthenticated is provided from the auth router
  app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/recipes', require('./recipes'));

module.exports = router;