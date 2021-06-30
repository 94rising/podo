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

  // dbConnection.connect(function(err) {
  //   if (err) throw err;
  //   dbConnection.query("SELECT * FROM DIARY ORDER BY id", function (err, result) {
  //     if (err) throw err;
  //     console.log(result);

  //     res.send({result});
  //   });


  res.sendFile(path.join(__dirname ,'../views', 'main.html' ));
});
// });
  
module.exports = router;