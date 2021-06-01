const express = require('express');
const router = express.Router();
const path = require('path');
const dbConnection = require('../util/database');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'../views', 'join.html' ))
});

router.post('/', (req, res) => {
    const id = req.body.id;
    console.log(id);
    dbConnection.query("SELECT * FROM member WHERE id = ?",[id], function (err, result) { //id가 DB에있는지 확인 
      if (err) throw err;
      console.log("result[0] >> " + result[0]); // 데이터 없을 경우, undefinded
      if (result[0] === undefined) {
        res.send({result:true})
      } else {
        res.send({result:false})
      }
    });
});


module.exports = router;