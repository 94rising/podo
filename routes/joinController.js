const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const dbConnection = require('../util/database');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const { nextTick } = require('process');
const { resolve } = require('path');


const algorithm = 'aes-256-cbc'; //crypto 관련
const iv = '1234567890123456'; //16자리//crypto 관련
const makeCertNumber = '1234';//crypto 관련
const key = 'abcdefghizklmnopqrstlmnddadwqers'//32자리//crypto 관련

// const saltRounds = 10; //bcypt 관련
// const  myPlaintextPassword  =  's0 / \ / \ P4 $$ w0rD' ; //bcypt 관련
// const  someOtherPlaintextPassword  =  'not_bacon' ; //bcypt 관련


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'../views', 'join.html' ))
});

router.post('/idConfirm', (req, res) => {
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



router.post('/emailCert', function (req, res) {  //이메일 중복확인 로직 넣기 ( 이메일 중복확인이 된 후에 인증번호 발급으로)
  const session = req.session;
  const joinEmail= req.body.email;

  // const encrytedCode = encrypt(makeCertNumber); // 함수안에 함수 넣기

  //   console.log(certNumber, encrytedCode);

    // req.session.save = encrytedCode; // 암호화된 세션 저장
    // const encrytedCodeSession = req.session.encrytedCode;



  dbConnection.query("SELECT * FROM member WHERE email = ?",[joinEmail], function (err, result) { //이메일 확인 로직추가한것
    
    if (err) { res.json({result: 'error'}) }

    console.log(result);

    if (err) throw err;
    console.log("result[0] >> " + result[0]); // 데이터 없을 경우, undefinded
    if (result[0] === undefined) {
       
     const transporter = nodemailer.createTransport({
        service: 'NAVER',
        auth: {
          user: 'chawoo94@naver.com',
          pass: 'll1082611',
        }
      });

      const mailOptions = {
        from: 'chawoo94@naver.com',
        to: joinEmail,//joinEmail로 변환
        subject: '인증번호 ',
        html: makeCertNumber, // 인증번호 함수가 들어가야함
      }
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send({result: 1}) // 1= email이 안보내졌을때
        } else { 
         console.log('Email sent: ' + info.response);

         req.session.encryptNumber = encrypt(makeCertNumber); //암호화 문장 세션 저장 

          res.send({result: 2, })  // 2= 정상작동했을 때

        }
        

      });

    } else {
      res.send({result: 0}) // 0= 이메일이 중복되었을 때

    }
  });
});



router.post('/certNumberConfirm', (req, res) => {
  const certNumber = req.body.certNumber;
  const encryptNumber = req.session.encryptNumber;   //세션에 저장된 암호화된 코드 받아오기 //현재 못받아오는중

  console.log('이메일 인증' + certNumber ); //넘어오는것 확인
  
  console.log('암호화 인증' + req.session.encryptNumber ); // 암호화 받아오기

  //복호화해서 인증번호와 일치하는지 확인 
  if (decrypt(encryptNumber) !== certNumber){ //복호화해서 인증번호와 일치하는지 확인 
   
    res.send({result:false}) //일치하지 않으면 오류 메시지, 일치하면 통과
   } 
  else {
    res.send({result:true})   
  }
  
 
});




router.post('/joinConfirm', async function (req, res) {
    const id = req.body.id;
    const password1 = req.body.password1;
    const joinEmail = req.body.joinEmail;
    const name = req.body.name;
    const phone = req.body.phone;
    const saltRounds = 10; //bcypt 관련
    const  myPlaintextPassword  =  's0 / \ / \ P4 $$ w0rD' ; //bcypt 관련
    const  someOtherPlaintextPassword  =  'not_bacon' ; //bcypt 관련

   //비밀번호 암호화
  //  bcrypt.hash ( password1 ,  saltRounds ,  async function ( err ,  hash )  {   // password에 해시를 저장합니다.
  //   try{
      
  //     console.log('암호화 비밀번호: ' + password);
  //     return password;
  //   }
  //   catch(err){//예외처리
  //      console.log(err);
  //   }
  //   });

  const hashPassword = async function(){
    console.log(bcrypt.hash(password1,saltRounds));
    const hashPwd = await bcrypt.hash(password1,saltRounds);
    
    console.log('암호화 비번' + hashPwd);
    return hashPwd;
  }

    const hashPwd = await hashPassword(); // Promise { <pending> } 이 전달됨.. 이유 알아봐야함 
    console.log('암호화 확인: ' + hashPwd); 

     dbConnection.query("INSERT INTO member (id, pw, email, name, phone) VALUES (?, ?, ?, ?, ?)",[id, hashPwd, joinEmail, name, phone], function (err, result) {  
      if (err) throw err;
      if(result.affectedRows === 1) {
        res.send({result:true});   
      } else {
        res.send({result:false});
      }
    });
});



// const makeCertNumber = () => { //인증번호 생성
//  return Math.floor(Math.random()*100000);
  
//   };

// const key = () => { //key 생성
//     const nowtime = Date.now()
//     return
//   };




  const encrypt = (value) => { //https://velog.io/@jm-shin/%EC%95%94%ED%98%B8%ED%99%94 참고해야함

    const fn = 'encrypt';
    try {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let result = cipher.update(value, 'utf8', 'base64');
        result += cipher.final('base64');
        console.log(`encrypt result: ${result}`);
        

        return result;
    } catch (error) {
        throw error;
    }
};

const decrypt = (value) => {   //복호화
    const fn = 'decrypt';
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv); 
        let result = decipher.update(value, 'base64', 'utf8');
        result += decipher.final('utf-8');
        console.log(`decrypt result: ${result}`);
        return result;
    } catch (error) {
        throw error;
    }
};


module.exports = router;