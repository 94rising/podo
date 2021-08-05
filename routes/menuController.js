const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const dbConnection = require('../util/database');
const request = require('request-promise');

let Kakao;

router.get('/', (req, res) => {

});



 router.get('/logout', async function (req, res) {
// const userId = req.session.userId;
const token = req.session.token;
// console.log('세션확인 :' + token.access_token)
let result
let kakao_logout
if(token !== undefined) kakao_logout = await kakaoLogout(token);

  req.session.destroy(function(err){
    res.send({result : true});

});
//   res.redirect('/');
// console.log('aa')

});


router.get('/auth/kakao/callback', (req,res,next)=> { //어싱크어웨잇
  console.log( req.session);

  // console.log('코드확인'+ code)
  
  console.log('zz콘솔확인띠')
  
});
  
async function kakaoLogout(token){


  const token1 = JSON.parse(token).access_token 
  console.log('zz')
  console.log(token1) // console.log("token ==>" + accessToken)
    const options2 =  {
      'method' : 'POST',
      'url': 'https://kapi.kakao.com/v1/user/logout',
      'headers' :{
        'Authorization' : 'Bearer ' + token1,
        'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }
  
 const logout = await request(options2, function (error, response){
    console.log('2')
    console.log(JSON.parse(response.body).id)
    if(error) throw new Error(error);
      
    })


 }

module.exports = router;
