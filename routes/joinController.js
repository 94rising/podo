const express = require('express');
const router = express.Router();
const path = require('path');
const dbConnection = require('../util/database');
const crypto = require('crypto');



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
  let joinEmail= req.body.email;
  const certNumber = makeCertNumber();
  const encrytedCode = encrypt(makeCertNumber, key);
    console.log(certNumber, encrytedCode);

        req.session.save = encrytedCode; // 암호화된 세션 저장
   

  /*const transporter = nodemailer.createTransport({
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
    text: certNumber,
  }

  dbConnection.query("SELECT * FROM member WHERE email = ?",[joinEmail], function (err, result) { //이메일 확인 로직추가한것
    
    if (err) {  res.json({result: 'error'}) }

    console.log(result);

    if (result[0] !== undefined) {
      res.send({result:0}) //0=email 중복
      // res.json({result: 'success' });
    } 
  });


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send({result: 1}) // 1= email이 안보내졌을때
    } else {
      console.log('Email sent: ' + info.response);
      
      res.send({result: 2, certNumber})  // 2= 정상작동했을 때
    }
  });
  */
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

function key(){ //key 생성
    const nowtime = Date.now()
    return nowtime.toString(36).substr(2,11);
  };

  function encrypt (makeCertNumber, key) { //암호화

  const cipher = crypto.createCipher('aes-256-cbc', key); 
  let result = cipher.update(makeCertNumber, 'utf8', 'base64'); // 'HbMtmFdroLU0arLpMflQ'
  result += cipher.final('base64'); // 'HbMtmFdroLU0arLpMflQYtt8xEf4lrPn5tX5k+a8Nzw='
    return result;
}

function decrypt (certNumber, result) { //복호화
  const decipher = crypto.createDecipher('aes-256-cbc', certNumber);
  let result2 = decipher.update(result, 'base64', 'utf8'); // 암호화할문 (base64, utf8이 위의 cipher과 반대 순서입니다.)
  result2 += decipher.final('utf8'); // 암호화할문장 (여기도 base64대신 utf8)
    return result2;

}


module.exports = router;