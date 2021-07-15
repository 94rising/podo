

const id = document.querySelector("#id");
const idCertNumber = document.querySelector("#idCertNumber");
const pwCertNumber = document.querySelector("#pwCertNumber");
const joinEmail = document.querySelector("#joinEmail");





//인증번호 메일로 전송  
document.getElementById('emailCert').addEventListener('click', function(){
    const joinEmail = document.getElementById('joinEmail').value
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 정규식

    // // 이메일 체크
    if(!emailRegExp.test(joinEmail)) {
        alert("이메일 확인해주세요."); 
        return false; 
    }
    // Example POST method implementation:
    postData('/find/emailCert', {
        email: joinEmail
    })
    .then(data => {
        console.log(JSON.stringify(data))
        switch(data.result) {
            case 0: //0=email 없을때
                alert('가입된 이메일이 없습니다.')
                break;
            case 1: //1= email이 안보내졌을때
                alert('이메일 발송에 실패했습니다.')
                break;
            case 2: // 2= 정상작동했을 때
                alert("메일이 발송됐습니다."); 
                break; 
        }   
    }) // JSON-string from `response.json()` call
    .catch(error => console.error(error));

});



document.getElementById('idCertNumberConfirm').addEventListener('click', function(){
    
    const certNumber = document.getElementById('idCertNumber').value;
    const joinEmail = document.getElementById('joinEmail').value


    console.log('인증번호확인 :' + certNumber);


   // Example POST method implementation:
   postData('find/idCertNumberConfirm', {
    email: joinEmail,
    certNumber: certNumber, //전달 확인됨
    
  })
   .then(data => {

       console.log(JSON.stringify(data))
       switch(data.result) {
        case 0: //0=email 없을때
            alert('인증번호 확인해주세요.')
            break;
        case 1: //1= email이 안보내졌을때
            alert('이메일 발송에 실패했습니다.')
            break;
        case 2: // 2= 정상작동했을 때
            alert("인증번호 확인되었습니다. 메일로 아이디 전송했습니다."); 
            break; 
    }   

       
           
       })// JSON-string from `response.json()` call
  .catch(error => console.error(error));
});  




function postData(url = '', data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses JSON response into native JavaScript objects
  }
