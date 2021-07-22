

const id = document.querySelector("#id");
const idCertNumber = document.querySelector("#idCertNumber");
const pwCertNumber = document.querySelector("#pwCertNumber");
const joinEmail = document.querySelector("#joinEmail");
const findPw = document.querySelector("#findPw");
const findPw2 = document.querySelector("#findPw2");




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
    postData('/find/idfind', {
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
            alert("인증번호 확인되었습니다. 이메일로 아이디 전송했습니다."); 
            break; 
    }   

       
           
       })// JSON-string from `response.json()` call
  .catch(error => console.error(error));
});  





document.getElementById('idBtn').addEventListener('click', function(){
    
    const id = document.getElementById('id').value;

    console.log(id);


   // Example POST method implementation:
   postData('find/pwfind', {
      id: id
       
  })
   .then(data => {
       console.log(JSON.stringify(data))
       switch(data.result) {
        case 0: //0=email 없을때
            alert('아이디를 확인해주세요.')
            break;
        case 1: //1= email이 안보내졌을때
            alert('이메일 발송에 실패했습니다.')
            break;
        case 2: // 2= 정상작동했을 때
            alert("아이디 확인되었습니다. 이메일로 아이디 전송했습니다."); 
            break; 
    }   

           
       })// JSON-string from `response.json()` call
  .catch(error => console.error(error));
});  




document.getElementById('pwCertNumberConfirm').addEventListener('click', function(){
    
    const certNumber = document.getElementById('pwCertNumber').value;

    console.log(certNumber);


   // Example POST method implementation:
   postData('find/pwCertNumberConfirm', {
       
    certNumber: certNumber, //전달 확인됨
       
  })
   .then(data => {

       console.log(JSON.stringify(data))
       
       if (data.result) {
        alert("인증번호 확인되었습니다.");
           } else {
        alert(" 인증번호 확인해주세요. ");
            }
           
       })// JSON-string from `response.json()` call
  .catch(error => console.error(error));
});  



document.getElementById('pwButton').addEventListener('click', function(){
  
    const id = document.getElementById('id').value.trim();
    const password1 = document.getElementById("findPw").value.trim();
    const password2 = document.getElementById("findPw2").value.trim();
    
     
    const phoneRegExp = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;   //정규식 수정
    const passwordRegExp = /^[A-Za-z0-9]{6,12}$/; // 숫자와 문자 포함 형태의 6~12자리 이내의 암호 정규식

    if (id == undefined) {
        alert('ID를 입력해주세요.')
        return false;
    }

    // 패스워드 체크
    if(!passwordRegExp.test(password1)) {
      alert("비밀번호 확인해주세요."); 
       return false; 
    }
    if (password1 !== password2) { 
      alert('비밀번호 확인해주세요')
      return false;
    } 
    

    // Example POST method implementation:
   postData('/find/findConfirm', {
    id: id,
    password1: password1,
    
  

     
})
 .then(data => {
     console.log('데이터확인 : ' + JSON.stringify(data))
     
     if (data.result) {
        console.log('리절트확인 :' + data.result)
        location.href = '/'
         } else {
            alert("비밀번호 변경 실패.");  
         }
         
     })// JSON-string from `response.json()` call
.catch(error => console.error(error));


})






function postData (url = '', data = {}) {
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
