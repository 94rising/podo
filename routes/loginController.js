

const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const dbConnection = require('../util/database');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const request = require('request-promise');
const cors = require('cors');
const { response } = require('express');


const saltRounds = 10; //bcypt 관련
const myPlaintextPassword  =  's0 / \ / \ P4 $$ w0rD' ; //bcypt 관련
const someOtherPlaintextPassword  =  'not_bacon' ; //bcypt 관련


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'../views', 'login.html' ))




});


router.get('/logout', async (req, res,result)  =>  {
  const loginSession = req.session;

  req.session.destroy( function (){
    console.log('파괴확인 :' + loginSession)
    
    loginSession;

    console.log('그냥확인q :' + loginSession) 

        });
        
    
    if (loginSession == undefined) res.send({result:true})
    else {
     console.log('그냥확인 :' + loginSession) 
     res.send({result:false})
   
 }

        // res.redirect('/');
     
       
  })



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
      req.session.name = rows[0].name;
      console.log('세션확인 : ' + req.session.userId)
      console.log('세션확인 : ' + req.session.name)

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




router.get('/kakao', (req, res, next)  =>{
  const options1 = {
    'method': 'GET',
    'url' : 'https://kauth.kakao.com/oauth/authorize?client_id=20e2b296829e3514f9a490fc43a5b076&redirect_uri=http://localhost:3000/login/auth/kakao/callback&response_type=code&scope=account_email',
    'header' : {
      'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'},

  
  };
  request(options1,function (error,response){
  // res.json(response) //res.json은 웹에서 출력 값을 출력
if(error) throw new Error(error);
//  console.log(response); // 터미널 출력 값 확인
res.send(response);
// res.redirect('http://localhost:3000/login/auth/kakao/callback')

})
// .then( result => {
//   console.log('확인 ' +  'result');
//   // res.send(result);
//   // res.setHeader(result);

// } )

});  


router.get('/auth/kakao/callback', async (req,res,next)=> { //어싱크어웨잇
  const code = req.query.code;
  let token = '';
  let nickname = '';
  let email = '';
  // console.log('코드확인'+ code)
  
  console.log('zz')
  const tokenRequest = await access_token_request (code);
  const authToken = await token_request(tokenRequest);
  const userInfo = await kakaoJoin(authToken);

  // console.log('sessionEmail', userInfo);
   console.log(  userInfo)
  req.session.userId = userInfo.email;
  req.session.name = userInfo.nickname;
  req.session.token = tokenRequest
  console.log( req.session);
  res.redirect('/');

});
  
// 
/**
 * 1) router(auth/kakao/callback)
 * 2) access_token_request
 * 3) token_request
 * 4) kakaoJoin
 */

// router.get('/account'){
//   request.get('code')
// }

 async function access_token_request (code) {

  const options =  {
    'method' : 'POST',
    'url': 'https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=20e2b296829e3514f9a490fc43a5b076&redirect_uri=http://localhost:3000/login/auth/kakao/callback&code='+code,
    'header' : {
    'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'},

  }

  const accessToken = request ( options,  async function(error, response) {
     console.log('1');
    if(error) throw new Error(error);
    token =  JSON.parse(response.body).access_token
    // console.log('token', token)
    //let result = await token_request(token)
    //console.log('리절ㄹ트확인 :' + result)
  })

  // console.log('access_token_request ::: userEmail => ', accessToken);
  return accessToken;
}

async function token_request(accessToken){
// console.log("token ==>" + accessToken)
  const options2 =  {
    'method' : 'POST',
    'url': 'https://kapi.kakao.com/v2/user/me',
    'headers' :{
      'Authorization' : 'Bearer ' + token,
      'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
    }
  }

  const kakaoEmail = await request(options2, function (error, response){
    console.log('2')
    if(error) throw new Error(error);
    // console.log('제이슨확인 :' + response.body)
    const nickname =  JSON.parse(response.body).properties.nickname
    const email = JSON.parse(response.body).kakao_account.email
    // console.log('확인닉이멜', nickname, email)
    //return email

  })
  return kakaoEmail

}

async function kakaoJoin(kakaoEmail){
  console.log('확인' + kakaoEmail)
  const email = JSON.parse(kakaoEmail).kakao_account.email
  const nickname = JSON.parse(kakaoEmail).properties.nickname
  // const nickname = req.body.kakao_account.profile.nickname;
  // const email = req.body.kakao_account.email;
  console.log('dasda서버 ======================== : ' + email, nickname );
  // console.log('dasda서버2 : ' + name );

  return await new Promise( (resolve,reject) => {
    const userId = dbConnection.query("SELECT * FROM member WHERE email = ? ORDER BY number ",[email],  function  (err, rows,req) { //id가 DB에있는지 확인 
    if (err) err; //err(error) : sql문 실행시키고 에러발생시 에러 출력/ 에러 없으면 NULL 값을 가짐
    
    if (rows[0] !== undefined) {
          // req.session.userId = rows[0].id;
          console.log( rows[0])
      console.log('딩동댕')
      resolve ({email, nickname})

        // res.send({result:true})
      } else {
        console.log('땡')

        dbConnection.query("INSERT INTO member (id, email, name) VALUES (?, ?, ?)",[email, email, nickname], function (err, result,req) {  
          if (err) throw err;
          if(result.affectedRows === 1) {
            console.log('인설트성공 + 세션저장성공')
            // res.send({result:true});   
            resolve ({email, nickname})

          } else {
            console.log('인설트실패')

            // res.send({result:false});
          }
      })


      }
    })
  })}









module.exports = router;





