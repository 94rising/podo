const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const dbConnection = require('../util/database');
const crypto = require('crypto');
const nodemailer = require("nodemailer");


const algorithm = 'aes-256-cbc';
const iv = '1234567890123456'; //16자리

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
  const certNumber = makeCertNumber();
  // const encrytedCode = encrypt(makeCertNumber);

  //   console.log(certNumber, encrytedCode);

  //   req.session.save = encrytedCode; // 암호화된 세션 저장
  //   //const encrytedCodeSession = req.session.encrytedCode;

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
          pass: 'll1082611'
        }
      });

      const mailOptions = {
        from: 'chawoo94@naver.com',
        to: joinEmail,//joinEmail로 변환
        subject: '인증번호 ',
        text: 'certNumber', // 인증번호 함수가 들어가야함
      }
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send({result: 1}) // 1= email이 안보내졌을때
        } else {
          console.log('Email sent: ' + info.response);

          res.send({result: 2, certNumber})  // 2= 정상작동했을 때
        }
      });

    } else {
      res.send({result: 0}) // 0= 이메일이 중복되었을 때

    }
  });
});


router.post('/joinConfirm', function (req, res) {
    const id = req.body.phoneNumber;
    const password = req.body.password1;
    const joinEmail = req.body.joinEmail;
    const certNumber = req.body.certNumber;
});



function makeCertNumber(){ //인증번호 생성
    Math.random().toString(36).slice(2);
  };

// function key(){ //key 생성
//     const nowtime = Date.now()
//     return nowtime.toString(36).substr(2,11);
//   };

  const encrypt = (makeCertNumber) => { //https://velog.io/@jm-shin/%EC%95%94%ED%98%B8%ED%99%94 참고해야함

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

const decrypt = (certNumber) => {
    const fn = 'decrypt';
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let result = decipher.update(certNumber, 'base64', 'utf8');
        result += decipher.final('utf-8');
        console.log(`decrypt result: ${result}`);
        return result;
    } catch (error) {
        throw error;
    }
};


module.exports = router;