const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const dbConnection = require('../util/database');

router.get('/', (req, res) => {
  const userId = req.session.userId;
  if (userId === undefined) {
    res.redirect('/login');
    return;
  }

  res.sendFile(path.join(__dirname ,'../views', 'main.html' ));
});
  
module.exports = router;