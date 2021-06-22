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

router.post('/', (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

// // 암호 DB에서 해시를로드합니다.  https://www.npmjs.com/package/bcrypt
// bcrypt . compareSync ( password ,  hash ) ;  // true 
// bcrypt . compareSync ( someOtherPlaintextPassword ,  hash ) ;  // 거짓

// 둘중에 해봐야함

//암호 확인
// bcrypt.compare(beforePassword, afterPassword, function(err, result) {
// 	//result는 암호가 맞는 경우 true , 암호가 틀린 경우 false로 반환
//     try{
//       //암호가 맞는 경우
//       if(result)
//           console.log('딩동댕!');
//       else 
//           console.log('땡!');
//     }
//     catch(err){//예외처리
//     	console.log(err);
//     }
// });




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




