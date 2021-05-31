

const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");
const joinBtn = document.querySelector("#joinBtn");

document.getElementById('joinBtn').addEventListener('click', function(){
    location.href = "/join"
  
})
document.getElementById('loginBtn').addEventListener('click', function(){

    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;


    // AJAX START
    const xhr = new XMLHttpRequest();

    // params : 요청 방식, 요청 경로, 동기/비동기 여부(서버에서 데이터 받을 때 까지 대기 여부, true일 경우 비동기)
    xhr.open("POST", '/login', true);
    // 서버에 데이터를 보내는 부분
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json"); // 서버에 보낼 데이터 타입 정의
    xhr.send(JSON.stringify({id, password })); // 객체를 json타입으로 변환 후, 서버에 데이터 전송
    xhr.responseType = "json";
    // 서버에서 데이터를 받는 부분
    
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            res = xhr.response;
            if (res.result) {
              location.href = '/calendar';
            } else {
                alert(" 아이디 혹은 비밀번호를 확인해주세요. ");
            }
        }
    }
    // AJAX END    


})












// loginBtn.addEventListener("click", login);

// function login() {
//    const req = { 
//     id : id.value,
//     password : password.value,
//     };

//     fetch("/login",{
//         metod:"POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringfy(req)
//     });
// }

