const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const dbConnection = require('../util/database');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const saltRounds = 10; //bcypt 관련
const myPlaintextPassword  =  's0 / \ / \ P4 $$ w0rD' ; //bcypt 관련
const someOtherPlaintextPassword  =  'not_bacon' ; //bcypt 관련


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'../views', 'login.html' ))

});

router.post('/',  async function (req, res){
  const id = req.body.id;
  const password = req.body.password;

  dbConnection.query("SELECT * FROM member WHERE id = ? ORDER BY number ",[id], function (err, rows) { //id가 DB에있는지 확인 
    if (err) err; //err(error) : sql문 실행시키고 에러발생시 에러 출력/ 에러 없으면 NULL 값을 가짐
    

    console.log('아이디확인: ' + rows[0]);
    
    
    if (rows[0] !== undefined) {

      // console.log('비밀번호확인: ' + hashPwd);
    let hash = rows[0].pw;
    console.log('해쉬 : ' + hash);


      req.session.userId = rows[0].id;
      console.log('세션확인 : ' + req.session.userId)
      console.log(rows[0]);

      bcrypt.compare(password, hash, function(err, result) {
        //result는 암호가 맞는 경우 true , 암호가 틀린 경우 false로 반환
         try{
           //암호가 맞는 경우
           if(result){
               console.log('딩동댕!');
               res.send({result:true})
            } else {
               console.log('땡!');
               res.send({result:false})
            }
         }
         catch(err){//예외처리
            console.log(err);
         }
      });
    }else { 
      res.json('/login');
    }
  })
});


module.exports = router;




// // 둘중에 해봐야함

// //암호 확인
// bcrypt.compare(password, has, function(err, result) {
//   //result는 암호가 맞는 경우 true , 암호가 틀린 경우 false로 반환
//     try{
//       //암호가 맞는 경우
//       if(result)
//           console.log('딩동댕!');
//       else 
//           console.log('땡!');
//     }
//     catch(err){//예외처리
//       console.log(err);
//     }
//   });