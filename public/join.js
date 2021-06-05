
const id = document.querySelector("#id");
const joinPw = document.querySelector("#joinPw");
const joinPw2 = document.querySelector("#joinPw2");
const certNumber = document.querySelector("#certNumber");
const joinEmail = document.querySelector("#joinEmail");



let globalCertNumber; //전역변수 (글로벌 변수 // emailCert부분에서 값 대입 // 사용은 joinConfirm)


document.getElementById('idBtn').addEventListener('click', function(){
            
    let id = document.getElementById('id').value;
    console.log(id);

            // AJAX START
    const xhr = new XMLHttpRequest();

    // params : 요청 방식, 요청 경로, 동기/비동기 여부(서버에서 데이터 받을 때 까지 대기 여부, true일 경우 비동기)
    xhr.open("POST", '/idConfirm', true);

    // 서버에 데이터를 보내는 부분
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json"); // 서버에 보낼 데이터 타입 정의
    // 보낼 데이터
    xhr.send(JSON.stringify({id})); // 객체를 json타입으로 변환 후, 서버에 데이터 전송
    xhr.responseType = "json";
    // 서버에서 데이터를 받는 부분               
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            res = xhr.response;
            if (res.result) {
                alert("ID 사용 가능합니다.");
            } else {
                alert("ID 확인해주세요.");
            }
        }
    }
    // AJAX END
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
    postData('/join/emailCert', {email: joinEmail})
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
                globalCertNumber = res.certNumber
                alert("메일이 발송됐습니다.");
                break;
        }   
    }) // JSON-string from `response.json()` call
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




document.getElementById('joinButton').addEventListener('click', function(){

    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const password1 = document.getElementById("joinPw").value.trim();
    const password2 = document.getElementById("joinPw2").value.trim();
    const joinEmail = document.getElementById('joinEmail').value.trim();
    const certNumber = document.getElementById('certNumber').value.trim();

    const phoneNumberRegExp = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;   //정규식 수정
    const passwordRegExp = /^[A-Za-z0-9]{6,12}$/; // 숫자와 문자 포함 형태의 6~12자리 이내의 암호 정규식

    // 폰번호 체크
    if(!phoneNumberRegExp.test(phoneNumber)) {
      alert("연락처 확인해주세요."); 
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
    
    //인증코드 체크
    if(globalCertNumber !== certNumber) {
      alert("인증번호 확인해주세요."); 
       return false; 
    }

    


      // AJAX START
      const xhr = new XMLHttpRequest();

      // params : 요청 방식, 요청 경로, 동기/비동기 여부(서버에서 데이터 받을 때 까지 대기 여부, true일 경우 비동기)
      xhr.open("POST", '/joinConfirm', true);
      
      // 서버에 데이터를 보내는 부분
      //Send the proper header information along with the request
      xhr.setRequestHeader("Content-Type", "application/json"); // 서버에 보낼 데이터 타입 정의
      // 보낼 데이터
      const sendData = {
        id,
        password1,
        joinEmail,
        certNumber,
       };

      xhr.send(JSON.stringify(sendData)); // 객체를 json타입으로 변환 후, 서버에 데이터 전송
      xhr.responseType = "json";
      // 서버에서 데이터를 받는 부분               //fetch 사용해봐야함
      xhr.onreadystatechange = function() { // Call a function when the state changes.
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            res = xhr.response;
            if (res.result) { 
              location.href = '/'
            } else {
               alert("회원가입 실패.");
            }
          }
      }
      // AJAX END


})

