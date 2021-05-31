const express = require('express');
const router = express.Router();
const path = require('path');



router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'../views', 'login.html' ))

});

router.post('/', (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    dbConnection.query("SELECT * FROM member WHERE id = ? and password = ?",[id, password], function (err, result) { //id가 DB에있는지 확인 
      if (err) throw err; 
      if (result[0] !== undefined) {
        res.send({result:true})
      } else {
        res.send({result:false})
      }
    });
});


module.exports = router;




