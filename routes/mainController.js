const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const dbConnection = require('../util/database');
const moment = require('moment');
const today = moment();
console.log(today.format());

router.get('/', (req, res) => {

const userId = req.session.userId;


if (userId === undefined) {
  res.redirect('/login');
  return;
}

console.log('메인 세션확인 : ' + userId )
res.sendFile(path.join(__dirname ,'../views', 'main.html' ));

});


  
router.post('/',  async function (req, res) {
  const userId = req.session.userId;
  const name = req.session.name;

console.log('메인 세션확인2 : ' + userId )
console.log('메인 세션확인3 : ' + name )

  
  let mainList = [];
  let result = '';
  dbConnection.query("SELECT * FROM DIARY WHERE id = ? ORDER BY date ",[userId], function (err, rows) {
      if(err){
          console.log(err);
      } else {
          for(let i=0; i<rows.length; i++){
            mainList.push(rows[i]); // row는 key:value 값 가짐
            
          } 
          result = {mainList, name};
          console.log(result);
          res.json(result);
      }
     
     
  });
            
    
});
  
module.exports = router;