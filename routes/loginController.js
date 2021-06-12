const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const dbConnection = require('../util/database');




router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'../views', 'login.html' ))

});

router.post('/', (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    dbConnection.query("SELECT * FROM member WHERE id = ? and pw = ?",[id, password], function (err, result) { //id가 DB에있는지 확인 
      if (err) throw err; //err(error) : sql문 실행시키고 에러발생시 에러 출력/ 에러 없으면 NULL 값을 가짐
      if (result[0] !== undefined) {
        req.session.userId = result[0].id;
        res.send({result:true})
      } else { 
        res.redirect('/login');
      }
    });
});


module.exports = router;




