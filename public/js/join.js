
const id = document.querySelector("#id");
const joinPw = document.querySelector("#joinPw");
const joinPw2 = document.querySelector("#joinPw2");
const certNumber = document.querySelector("#certNumber");
const joinEmail = document.querySelector("#joinEmail");
const name = document.querySelector("#name");
// const gender = document.querySelector("#gender");

// const genderCheck = document.querySelector('input[name="gender"]').checked; // 체크 여부(checked)
//const gender = document.querySelector('input[name="gender"]:checked').value; // 체크된 값(checked value)
//const sex = document.querySelector('input[name="radioName"]:checked').value;


//let globalCertNumber; //전역변수 (글로벌 변수 // emailCert부분에서 값 대입 // 사용은 joinConfirm)

document.getElementById('idBtn').addEventListener('click', function(){
    
    const id = document.getElementById('id').value;

    console.log(id);


   // Example POST method implementation:
   postData('join/idConfirm', {
      id: id
       
  })
   .then(data => {
       console.log(JSON.stringify(data))
       
       if (data.result) {
          alert("ID 사용 가능합니다.");
           } else {
               alert(" ID 확인해주세요. ");
               
           }
           
       })// JSON-string from `response.json()` call
  .catch(error => console.error(error));
});  






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
    postData('/join/emailCert', {
        email: joinEmail
    })
    .then(data => {
        console.log(JSON.stringify(data))
        switch(data.result) {
            case 0: //0=email 중복
                alert('이메일이 중복되었습니다.')
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




document.getElementById('certNumberConfirm').addEventListener('click', function(){
    
    const certNumber = document.getElementById('certNumber').value;

    console.log(certNumber);


   // Example POST method implementation:
   postData('join/certNumberConfirm', {
       
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




document.getElementById('joinButton').addEventListener('click', function(){
  
    const id = document.getElementById('id').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password1 = document.getElementById("joinPw").value.trim();
    const password2 = document.getElementById("joinPw2").value.trim();
    const joinEmail = document.getElementById('joinEmail').value.trim();
    const name = document.getElementById('name').value.trim();
    // const gender = document.getElementsByName('gender').value
    
     

    //const certNumber = document.getElementById('certNumber').value.trim();

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
    
    if (name == undefined) {
        alert('이름을 입력해주세요.')
        return false;
    }

    // if(gender == undefined) {
    //     alert('성별을 선택해주세요.')
    //     return false;
    // }

    // 폰번호 체크
    if(!phoneRegExp.test(phone)) {
        alert("연락처 확인해주세요."); 
        return false;
    }

    // //인증코드 체크
    // if(decrypt result값 !== certNumber) {
    //   alert("인증번호 확인해주세요."); 
    //    return false; 
    // }


    // const gender ;
    //   for(let i=0; i < genderr.length; i++) {
    //          console.log(genderr[i].value);
    //         } 

    // Example POST method implementation:
   postData('/join/joinConfirm', {
    id: id,
    password1: password1,
    joinEmail: joinEmail,
    name: name,
    phone: phone,
    // gender: gender[i].value,
    

     
})
 .then(data => {
     console.log(JSON.stringify(data))
     
     if (data.result) {
        location.href = '/'
         } else {
            alert("회원가입 실패.");  
         }
         
     })// JSON-string from `response.json()` call
.catch(error => console.error(error));


})



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
  
