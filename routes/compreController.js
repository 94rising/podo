const express = require('express');
const router = express.Router();
const path = require('path');
const dbConnection = require('../util/database');
const session = require('express-session');





router.get( '/',  async (req, res) => {
   
  res.sendFile(path.join(__dirname ,'../views', 'compre.html' ))

    
    
})


router.post("/", async (req, res) => { 
    const userId = req.session.userId;
    const date = req.session.date;
    let result = '';
    
    console.log( '데이트확인!!' + date );
    let compreList = [];
    dbConnection.query("SELECT * from DIARY WHERE id = ? and date = ? ", [userId, date], function (err, rows) {
            console.log( '데이트확인!!' + date );

        if(err){
            console.log(err);
        } else {
            compreList.push(rows[0]); // row는 key:value 값 가짐
                 
                 result = {compreList, date};
                 console.log(result)
                 res.json(result);
             
               }
    });
                




});


module.exports = router;
