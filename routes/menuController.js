const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const dbConnection = require('../util/database');
const request = require('request-promise');

let Kakao;

router.get('/', (req, res) => {

});



router.get('/logout', function (req, res) {
// const userId = req.session.userId;
const token = req.session.token;
// console.log('세션확인 :' + token.access_token)
let result
 kakaoLogout(token);

 function kakaoLogout(token){
  const token1 = JSON.parse(token).access_token 
  console.log('zz')
  console.log(token1) // console.log("token ==>" + accessToken)
    const options2 =  {
      'method' : 'GET',
      'url': 'https://kapi.kakao.com/oauth/logout?client_id=20e2b296829e3514f9a490fc43a5b076&logout_redirect_uri=http://localhost:3000/menu/auth/kakao/callback',
      'headers' :{
        // 'Authorization' : 'Bearer ' + token1,
        'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }
  
   request(options2, function (error, response){
      console.log('2')
      if(error) throw new Error(error);
    })
  
 }
//   req.session.destroy(function(err){
//     // res.send({result : true});

// });
//   res.redirect('/');
 
res.send('http://localhost:3000/menu/auth/kakao/callback')});


router.get('/auth/kakao/callback', (req,res,next)=> { //어싱크어웨잇
  console.log( req.session);

  // console.log('코드확인'+ code)
  
  console.log('zz콘솔확인띠')
  
});
  


module.exports = router;
